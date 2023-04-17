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
