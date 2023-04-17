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
# Sure, here is a detailed implementation plan to create the cluster-config.json file and use it in your IAC app to provision an EKS cluster:

Create a new file called cluster-config.json in your project's root directory.

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

# This configuration defines two stages, prod and dev, each with their own values for the parameters. Note that you should replace the example VPC ID and subnet IDs with your own values.

In your IAC app's code, read the cluster-config.json file and extract the configuration based on the stage (e.g., prod or dev) passed in as an environment variable.

Use the extracted configuration to set the required environment variables, such as the cluster name, region, VPC ID, subnets, node capacity, instance types, Kubernetes version, ALB controller, and cluster logging.

Define the AWS EKS cluster construct in your app, using the environment variables to set the required parameters dynamically. You can use the aws-eks and aws-ec2 CDK constructs to create the EKS cluster and configure the required infrastructure.

Deploy your app using the AWS CDK CLI, which will create the EKS cluster with the specified characteristics based on the configuration defined in the cluster-config.json file.

Repeat the process for each environment or stage (e.g., test, qa, etc.), updating the cluster-config.json file as needed to set the appropriate configuration values.

By following these steps, you should be able to create a reusable IAC template that can provision EKS clusters with the specified characteristics in a consistent manner, and allow you to manage the cluster configuration for different environments or stages.

# To reference the cluster-config.json file in your IAC app's code, you can use the built-in fs module in Node.js. Here's an example of how to read the configuration from the cluster-config.json file:

import * as fs from 'fs';

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

# In this example, the fs module is used to read the cluster-config.json file and parse it as a JSON object. Then, the configuration for the current stage is retrieved based on the STAGE environment variable, which defaults to dev if not set. Finally, the configuration values are used to set the required environment variables.

You can place this code in the entry point of your app's code (e.g., index.ts) to ensure that the configuration is loaded before the EKS cluster construct is defined. Note that you may need to adjust the paths or file names based on your project structure.



# 1.  Created App
  - init -----> app 
  - cdk synth
  - bootstraping
# 2. After App creation
      Generated a couple of configurations files and directors
      # bin  -----> binary file to which all stack information will be referenced
      # lib  -----> Stack code in ts format
      # Config ----> Stack parameters are difined 
