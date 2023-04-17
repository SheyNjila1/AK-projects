#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksClusterStack } from '../lib/latestcluster-vpcid'; // Replace with your stack file's import

const app = new cdk.App();
const envProd = { account: '812714054388', region: 'us-east-2' };
const envDev = { account: '812714054388', region: 'us-east-2' };

new EksClusterStack(app, 'ProdEksClusterStack', {
  env: envProd,
  config: app.node.tryGetContext('prod'),
});

new EksClusterStack(app, 'DevEksClusterStack', {
  env: envDev,
  config: app.node.tryGetContext('dev'),
});











// import 'source-map-support/register';
// import * as cdk from 'aws-cdk-lib';
// // import { EksClusterStack } from '../lib/cdk-ekscluster-stack';
// import { EksClusterStack } from '../lib/latestcluster-vpcid';

// const app = new cdk.App();

// new EksClusterStack(app, 'EksClusterStack', {
//   // env: {
//   //   account: process.env.CDK_DEFAULT_ACCOUNT,
//   //   region: process.env.CDK_DEFAULT_REGION,
//   // },
//   env: {
//     account: '812714054388',
//     region: 'us-east-2',
//   },
  
// });
















// #!/usr/bin/env node
// import 'source-map-support/register';
// import * as cdk from 'aws-cdk-lib';
// import { EksClusterStack } from '../lib/cdk-ekscluster-stack';

// const app = new cdk.App();
// // new EksClusterStack(app, 'EksClusterStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// // });
// new EksClusterStack(app, 'EksClusterStack', {
//   env: {
//     account: process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.CDK_DEFAULT_REGION
//   }
// });
