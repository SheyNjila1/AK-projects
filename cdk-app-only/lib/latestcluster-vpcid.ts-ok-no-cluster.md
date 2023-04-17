import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import { Construct } from 'constructs';
import * as fs from 'fs';

interface ClusterConfig {
  name: string;
  region: string;
  vpcId: string;
  subnets: string[];
  minCapacity: number;
  maxCapacity: number;
  instanceType: string;
  kubernetesVersion: string;
  albController: boolean;
  clusterLogging: boolean;
}


interface EksClusterStackProps extends cdk.StackProps {
  config: any; // You can replace 'any' with the specific type of your config object if you have one defined
}

export class EksClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EksClusterStackProps) {
    super(scope, id, props);

    const config = props.config;
    // Use the 'config' object in your stack
  }
}

// App entry point
const app = new cdk.App();
const envProd = { account: '812714054388', region: 'us-east-1' };
const envDev = { account: '812714054388', region: 'us-east-2' };

new EksClusterStack(app, 'ProdEksClusterStack', {
  env: envProd,
  config: app.node.tryGetContext('prod'),
});

new EksClusterStack(app, 'DevEksClusterStack', {
  env: envDev,
  config: app.node.tryGetContext('dev'),
});

app.synth();

