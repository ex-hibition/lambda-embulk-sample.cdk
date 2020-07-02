import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';

export class EmbulkCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'layer', {
      code: lambda.Code.fromAsset('lambda/embulk.zip')
    });

    const fn = new lambda.Function(this, 'embulk-to-s3', {
      runtime: lambda.Runtime.PROVIDED,
      code: lambda.Code.fromAsset('lambda/function.zip'),
      handler: 'function.handler',
      timeout: cdk.Duration.seconds(120),
      layers: [layer]
    });

    const bucket = new s3.Bucket(this, 'embulk-output');
    bucket.grantReadWrite(fn)
  }
}
