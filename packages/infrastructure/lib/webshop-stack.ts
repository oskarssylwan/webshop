import * as cdk from '@aws-cdk/core';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as ec2 from '@aws-cdk/aws-ec2';
import { Client } from './client-construct';
import { Api } from './api-construct';
import { Database } from './database-construct';

interface StackProps extends cdk.StackProps {
  enviormentName: string;
  domainName: string;
}

export class WebShopStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new Client(this, 'Client', {
      subDomain: props.enviormentName,
      domainName: props.domainName,
      deploymentAsset: s3Deploy.Source.asset('../client/build')
    })

    const api = new Api(this, 'Api', {
      enviormentName: props.enviormentName,
      domainName: props.domainName,
      enviormentVariables: s3Deploy.Source.asset('./enviorment', )
    })

    new Database(this, 'Database', {
      enviormentName: props.enviormentName,
      domainName: props.domainName,
      connections: [
        [api.instance, ec2.Port.tcp(27017), 'Allow access from the world to mongodb']
      ]
    })

  }
}
