import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import { Construct } from 'constructs';

export class EksClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Use the default VPC
    // const vpc = ec2.Vpc.fromLookup(this, 'MyVpc', { isDefault: true });
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // You can adjust the number of availability zones based on your needs
    });    

    // Create an EKS cluster
    const eksCluster = new eks.Cluster(this, 'MyEksCluster', {
      vpc: vpc,
      version: eks.KubernetesVersion.V1_22, // Add this line to set the Kubernetes version
    });

    const nodeGroupName = 'MyNodeGroup';
    const instanceType = 't3.medium';
    const minSize = 1;
    const maxSize = 2;

    // Add a managed node group to the EKS cluster
    const nodeGroup = eksCluster.addNodegroupCapacity(nodeGroupName, {
      instanceTypes: [new ec2.InstanceType(instanceType)], // Change 'instanceType' to 'instanceTypes'
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
    new cdk.CfnOutput(this, 'ClusterEndpoint', {
      value: eksCluster.clusterEndpoint,
    });
  }
}

const app = new cdk.App();
new EksClusterStack(app, 'EksClusterStack');
