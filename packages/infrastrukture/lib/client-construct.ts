import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

interface StackProps extends cdk.StackProps {
  subDomain: string;
  domainName: string;
  deploymentAsset: s3Deploy.ISource
}

export class Client extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id);

    const domain = `${props.subDomain}.${props.domainName}`

    const websiteBucket = new s3.Bucket(this, 'Bucket', {
      bucketName: domain,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true
    })

    const redirectBucket = new s3.Bucket(this, 'Bucket www', {
      bucketName: `www.${domain}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
      websiteRedirect: { hostName: domain }
    })

    const zone = route53.HostedZone.fromLookup(this, `zone-${props.domainName}`, {
      domainName: props.domainName
    })

    new route53.ARecord(this, 'ARecord Frontend', {
      zone: zone,
      recordName: domain,
      target: route53.RecordTarget.fromAlias(new route53Targets.BucketWebsiteTarget(websiteBucket))
    })

    new route53.ARecord(this, 'ARecord-www Frontend', {
      zone: zone,
      recordName: `www.${domain}`,
      target: route53.RecordTarget.fromAlias(new route53Targets.BucketWebsiteTarget(redirectBucket))
    })

    new s3Deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [props.deploymentAsset],
      destinationBucket: websiteBucket,
      retainOnDelete: false
    })

  }
}
