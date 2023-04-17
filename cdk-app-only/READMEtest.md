# To create an IAC template to provision an EKS cluster with the listed characteristics, you can follow these steps:

Install AWS CDK and configure your AWS CLI credentials to interact with your AWS account.

Create a new CDK app using TypeScript as the programming language.

Define the required dependencies for your app, such as the AWS EKS and EC2 modules.

Define the AWS EKS cluster construct with the required parameters such as cluster name, region, VPC, subnets, node capacity, instance types, Kubernetes version, etc. You can refer to the AWS CDK documentation and the example provided by AWS to create an EKS cluster using TypeScript.

Implement environment variables for the key characteristics such as the cluster name, stage, VPC ID, subnets, node capacity, instance types, Kubernetes version, ALB controller, and cluster logging. You can use the AWS CDK aws-ec2 and aws-eks constructs to retrieve VPC and subnet IDs dynamically based on the environment variables.

Create a cluster-config.json file that contains the default configuration for your EKS cluster, such as the instance types and Kubernetes version for different stages (dev, prod, etc.).

Modify your app's code to read the cluster-config.json file and set the required environment variables based on the stage.

Deploy your app using the AWS CDK CLI, which will create the EKS cluster with the specified characteristics.

Overall, the approach above should help you create a reusable IAC template that can provision an EKS cluster in a consistent manner, and allow you to manage the cluster configuration based on different environments or stages.


====================

# Create a new file called cluster-config.json in your project's root directory.

Define the default configuration for your EKS cluster in the cluster-config.json file, including the parameters listed in the project description. Here is an example configuration:
{
  "prod": {
    "name": "my-eks-cluster-prod",
    "region": "us-east-1",
    "vpcId": "vpc-oe47dc5465e92c223",
    "subnets": ["subnet-12345678", "subnet-23456789"],
    "minCapacity": 2,
    "maxCapacity": 20,
    "instanceType": "m5.xlarge",
    "kubernetesVersion": "1.21",
    "albController": true,
    "clusterLogging": true
  },
  "dev": {
    "name": "my-eks-cluster-dev",
    "region": "us-east-1",
    "vpcId": "vpc-oe47dc5465e92c223",
    "subnets": ["subnet-34567890", "subnet-45678901"],
    "minCapacity": 1,
    "maxCapacity": 10,
    "instanceType": "m5a.large",
    "kubernetesVersion": "1.21",
    "albController": true,
    "clusterLogging": true
  }
}




# 1.  Created App
  - init -----> app 
  - cdk synth
  - bootstraping
# 2. After App creation
      Generated a couple of configurations files and directors
      # bin  -----> binary file to which all stack information will be referenced
      # lib  -----> Stack code in ts format
      # Config ----> Stack parameters are difined 
