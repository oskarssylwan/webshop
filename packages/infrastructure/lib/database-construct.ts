import * as cdk from '@aws-cdk/core';
import { Instance } from './instance-construct'
import * as ec2 from '@aws-cdk/aws-ec2';
import * as path from 'path';

interface StackProps extends cdk.StackProps {
  enviormentName: string;
  domainName: string;
  connections?: [ec2.IConnectable, ec2.Port, string][]
}

export class Database extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id);

    new Instance(this, 'Database', {
      subDomain: `db.${props.enviormentName}`,
      domainName: props.domainName,
      userDataFullPath: path.join(__dirname, '../scripts/db-user-data.sh'),
      // access: ec2.SubnetType.PRIVATE,
      connections: props.connections,
    })

  }
}
