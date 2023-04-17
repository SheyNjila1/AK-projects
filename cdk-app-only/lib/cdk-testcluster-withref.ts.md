import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import { Construct } from 'constructs';
import * as fs from 'fs';

export class EksClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Load the configuration file
    const config = JSON.parse(fs.readFileSync('cluster-config.json', 'utf8'));

    // Get the configuration for the current stage
    const stage = process.env.STAGE || 'dev';
    const stageConfig = config[stage];

    // Set environment variables based on the configuration
    process.env.CLUSTER_NAME = stageConfig.name;
    process.env.REGION = stageConfig.region;
    process.env.VPC_ID = stageConfig.vpcId;
    process.env.SUBNETS = stageConfig.subnets.join(',');
    process.env.MIN_CAPACITY = String(stageConfig.minCapacity);
    process.env.MAX_CAPACITY = String(stageConfig.maxCapacity);
    process.env.INSTANCE_TYPE = stageConfig.instanceType;
    process.env.KUBERNETES_VERSION = stageConfig.kubernetesVersion;
    process.env.ALB_CONTROLLER = stageConfig.albController ? 'true' : 'false';
    process.env.CLUSTER_LOGGING = stageConfig.clusterLogging ? 'true' : 'false';

    // Use the default VPC
    // const vpc = ec2.Vpc.fromLookup(this, 'MyVpc', { isDefault: true });
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // You can adjust the number of availability zones based on your needs
      vpcId: process.env.VPC_ID, // Use the VPC ID from the configuration
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE,
          reserved: false,
        },
      ],
    });

    // Create an EKS cluster
    const eksCluster = new eks.Cluster(this, 'MyEksCluster', {
      vpc: vpc,
      version: eks.KubernetesVersion.of(process.env.KUBERNETES_VERSION), // Use the Kubernetes version from the configuration
    });

    const nodeGroupName = 'MyNodeGroup';
    const instanceType = process.env.INSTANCE_TYPE; // Use the instance type from the configuration
    const minSize = Number(process.env.MIN_CAPACITY); // Use the min capacity from the configuration
    const maxSize = Number(process.env.MAX_CAPACITY); // Use the max capacity from the configuration

    // Add a managed node group to the EKS cluster
    const nodeGroup = eksCluster.addNodegroupCapacity(nodeGroupName, {
      instanceTypes: [new ec2.InstanceType(instanceType)],
      minSize: minSize,
      maxSize: maxSize,
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
    new cdk.CfnOutput
