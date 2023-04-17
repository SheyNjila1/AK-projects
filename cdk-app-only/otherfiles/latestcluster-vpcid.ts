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

export class EksClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Load the configuration file
    const config: { [stage: string]: ClusterConfig } = JSON.parse(fs.readFileSync('cluster-config.json', 'utf8'));

    // Get the configuration for the current stage
    const stage = process.env.STAGE || 'dev';
    const stageConfig = config[stage];

    // Reference an existing VPC by ID
    const vpc = ec2.Vpc.fromLookup(this, 'MyVpc', { vpcId: stageConfig.vpcId });

    // Create an EKS cluster
    const eksCluster = new eks.Cluster(this, 'MyEksCluster', {
      vpc: vpc,
      version: eks.KubernetesVersion.of(stageConfig.kubernetesVersion),
    });

    const nodeGroupName = 'MyNodeGroup';

    const nodeGroup = eksCluster.addNodegroupCapacity(nodeGroupName, {
      instanceTypes: [new ec2.InstanceType(stageConfig.instanceType)],
      minSize: stageConfig.minCapacity,
      maxSize: stageConfig.maxCapacity,
    });

    // Output the EKS cluster name
    new cdk.CfnOutput(this, 'ClusterName', {
      value: eksCluster.clusterName,
    });

    // Output the node group name
    new cdk.CfnOutput(this, 'NodeGroupName', {
      value: nodeGroupName,
    });

    // Output the EKS cluster endpoint
    new cdk.CfnOutput(this, 'ClusterEndpoint', {
      value: eksCluster.clusterEndpoint,
    });
  }
}

const app = new cdk.App();
new EksClusterStack(app, 'EksClusterStack');
