import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();
const stack = new cdk.Stack(app, 'EksClusterStack');

// Read the current stage from the STAGE environment variable
const stage = process.env.STAGE || 'dev';

// Read the path to the cluster-config.json file from the CLUSTER_CONFIG_PATH environment variable
const clusterConfigPath = process.env.CLUSTER_CONFIG_PATH || './cluster-config.json';

// Read the default configuration for the current stage from the cluster-config.json file
const clusterConfig = require(clusterConfigPath);
const config = clusterConfig[stage];

// Define the VPC for your EKS cluster
const vpc = ec2.Vpc.fromLookup(stack, 'VPC', {
  vpcId: 'your-vpc-id',
});

// Define the EKS cluster with the required configuration
const cluster = new eks.Cluster(stack, 'Cluster', {
  vpc: vpc,
  version: eks.KubernetesVersion.V1_21,
  defaultCapacity: 0,
  capacity: {
    instanceType: new ec2.InstanceType(config.instanceType),
    minCapacity: 1,
    maxCapacity: 2,
  },
});

// Set the required environment variables for your EKS cluster
process.env.CLUSTER_NAME = cluster.clusterName;
process.env.CLUSTER_REGION = cluster.stack.region;
process.env.CLUSTER_ENDPOINT = cluster.clusterEndpoint;
process.env.CLUSTER_CERTIFICATE_AUTHORITY_DATA = cluster.clusterCertificateAuthorityData;

// Deploy your app using the AWS CDK CLI
cdk.Tags.of(stack).add('App', 'MyApp');
app.synth();
