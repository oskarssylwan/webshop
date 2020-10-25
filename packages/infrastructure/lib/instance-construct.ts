import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as s3Assets from '@aws-cdk/aws-s3-assets';
import * as route53 from '@aws-cdk/aws-route53';
import * as ec2 from '@aws-cdk/aws-ec2';

interface StackProps extends cdk.StackProps {
  subDomain: string;
  domainName: string;
  enviormentVariables?: s3Deploy.ISource;
  userDataFullPath: string;
  access?: ec2.SubnetType;
  connections?: [ec2.IConnectable, ec2.Port][]
}

export class Instance extends cdk.Construct {

  instance: ec2.Instance;

  constructor(
    scope: cdk.Construct,
    id: string,
    {
      subDomain,
      domainName,
      enviormentVariables,
      userDataFullPath,
      access = ec2.SubnetType.PUBLIC,
      connections = [
        [ec2.Peer.anyIpv4(), ec2.Port.tcp(80)]
      ]
    }: StackProps
  ) {

    super(scope, id)

    const domain = subDomain ? `${subDomain}.${domainName}` : domainName

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true, })

    const image = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
    })

    this.instance = new ec2.Instance(this, 'Instance', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: image,
      vpcSubnets:  { subnetType: access }
    })

    connections.forEach(connection => {
      this.instance.connections.allowFrom(...connection)
    })

    const bootstrapScriptAsset = new s3Assets.Asset(this, 'User Data', {
      path: userDataFullPath
    })

    const localPath = this.instance.userData.addS3DownloadCommand({
      bucket: bootstrapScriptAsset.bucket,
      bucketKey: bootstrapScriptAsset.s3ObjectKey,
    })

    this.instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: '--verbose -y'
    })

    bootstrapScriptAsset.grantRead(this.instance.role);

    const zone = route53.HostedZone.fromLookup(
      this,
      `zone-${domainName}`,
      { domainName }
    )

    new route53.ARecord(this, 'Instance DNS', {
      zone: zone,
      recordName: domain,
      target: route53.RecordTarget.fromIpAddresses(
        this.instance.instancePublicIp
      )
    })

    if (!!enviormentVariables) {

      const envBucket = new s3.Bucket(this, 'Env Bucket', {
        bucketName: `env.${domain}`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      })

      envBucket.grantRead(this.instance.role)

      new s3Deploy.BucketDeployment(this, 'DeployEnv', {
        sources: [enviormentVariables],
        destinationBucket: envBucket,
        retainOnDelete: false
      })

    }

  }
}
