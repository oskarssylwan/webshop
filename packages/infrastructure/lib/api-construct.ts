import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as path from 'path';
import { Instance } from './instance-construct';

interface StackProps extends cdk.StackProps {
  enviormentName: string;
  domainName: string;
  enviormentVariables?: s3Deploy.ISource;
}

export class Api extends cdk.Construct {

  instance: ec2.Instance;

  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id);

    const api = new Instance(this, 'Api', {
      subDomain: `api.${props.enviormentName}`,
      domainName: props.domainName,
      enviormentVariables: s3Deploy.Source.asset('./enviorment', ),
      userDataFullPath: path.join(__dirname, '../scripts/api-user-data.sh')
    })

    this.instance = api.instance

    new s3.Bucket(this, 'Media Bucket', {
      bucketName: `media.${props.enviormentName}.${props.domainName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true
    }).grantWrite(api.instance.role)

  }
}
