import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as s3Assets from '@aws-cdk/aws-s3-assets';
import * as route53 from '@aws-cdk/aws-route53';
import * as ec2 from '@aws-cdk/aws-ec2';

interface StackProps extends cdk.StackProps {
  enviormentName: string;
  domainName: string;
  enviormentVariables?: s3Deploy.ISource;
  userDataFullPath: string;
}

export class Api extends cdk.Construct {

  securityGroup: ec2.SecurityGroup;

  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true, })

    this.securityGroup = new ec2.SecurityGroup(this, 'SG Allow port 80', {
      vpc,
      description: 'Allow port 80',
      allowAllOutbound: true
    });

    this.securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow port 80 from the world');

    const image = new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 })

    const instance = new ec2.Instance(this, 'Api Instance', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: image,
      securityGroup: this.securityGroup,
      vpcSubnets:  { subnetType: ec2.SubnetType.PUBLIC }
    })

    const bootstrapScriptAsset = new s3Assets.Asset(this, 'Asset', {
      path: props.userDataFullPath
    });

    const localPath = instance.userData.addS3DownloadCommand({
      bucket: bootstrapScriptAsset.bucket,
      bucketKey: bootstrapScriptAsset.s3ObjectKey,
    });

    instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: '--verbose -y'
    })

    bootstrapScriptAsset.grantRead(instance.role);

    const zone = route53.HostedZone.fromLookup(this, `zone-${props.domainName}`, {
      domainName: props.domainName
    })

    new route53.ARecord(this, 'ARecord Api', {
      zone: zone,
      recordName: `api.${props.enviormentName}.${props.domainName}`,
      target: route53.RecordTarget.fromIpAddresses(instance.instancePublicIp)
    })

    new s3.Bucket(this, 'Media Bucket', {
      bucketName: `media.${props.enviormentName}.${props.domainName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true
    }).grantWrite(instance.role)

    if (!!props.enviormentVariables) {

      const envBucket = new s3.Bucket(this, 'Env Bucket', {
        bucketName: `env.${props.enviormentName}.${props.domainName}`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      })

      envBucket.grantRead(instance.role)

      new s3Deploy.BucketDeployment(this, 'DeployEnv', {
        sources: [props.enviormentVariables],
        destinationBucket: envBucket
      })

    }


  }
}
