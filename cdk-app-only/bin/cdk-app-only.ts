#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import { EksClusterStack } from '../lib/latestcluster-vpcid'; // Replace with your stack file's import

// Read the cluster-config.json file
const configFile = 'cluster-config.json';
const rawConfig = fs.readFileSync(configFile);
const clusterConfig = JSON.parse(rawConfig.toString());

const app = new cdk.App();
const envProd = { account: 'YOUR AWS ACCOUNT ID', region: 'us-east-2' };
const envDev = { account: 'YOUR AWS ACCOUNT ID', region: 'us-east-2' };

new EksClusterStack(app, 'ProdEksClusterStack', {
  env: envProd,
  config: clusterConfig['prod'],
});

new EksClusterStack(app, 'DevEksClusterStack', {
  env: envDev,
  config: clusterConfig['dev'],
});

app.synth();








