#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EmbulkCdkStack } from '../lib/embulk.cdk-stack';

const app = new cdk.App();
new EmbulkCdkStack(app, 'EmbulkCdkStack');
