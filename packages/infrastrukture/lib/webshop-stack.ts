import * as cdk from '@aws-cdk/core';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as path from 'path';
import { Client } from './client-construct';
import { Api } from './api-construct';

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

    new Api(this, 'Api', {
      enviormentName: props.enviormentName,
      domainName: props.domainName,
      enviormentVariables: s3Deploy.Source.asset('./enviorment', ),
      userDataFullPath: path.join(__dirname, '../api-user-data.sh'),
    })

  }
}
