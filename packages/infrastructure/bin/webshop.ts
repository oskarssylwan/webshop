#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebShopStack } from '../lib/webshop-stack';

const app = new cdk.App();

new WebShopStack(app, 'WebShopStack', {
  enviormentName: 'webshop',
  domainName: 'oskarssylwan.com',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
