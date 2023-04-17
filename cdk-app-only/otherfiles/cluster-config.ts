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

const clusterConfigs: { [key: string]: ClusterConfig } = {
 prod: {
   name: "my-eks-cluster-prod",
   region: "us-east-1",
   vpcId: "vpc-oe47dc5465e92c223",
   subnets: ["subnet-12345678", "subnet-23456789"],
   minCapacity: 2,
   maxCapacity: 4,
   instanceType: "m5.xlarge",
   kubernetesVersion: "1.21",
   albController: true,
   clusterLogging: true,
 },
 dev: {
   name: "my-eks-cluster-dev",
   region: "us-east-1",
   vpcId: "vpc-oe47dc5465e92c223",
   subnets: ["subnet-34567890", "subnet-45678901"],
   minCapacity: 1,
   maxCapacity: 10,
   instanceType: "m5a.large",
   kubernetesVersion: "1.21",
   albController: true,
   clusterLogging: true,
 },
};


// In this version, the ClusterConfig interface remains the same, but the JSON object is replaced with a TypeScript constant clusterConfigs, which is an object with keys for each environment ('prod' and 'dev') and values of type ClusterConfig. This new structure allows you to take advantage of TypeScript's type checking and other features when working with the configuration.
