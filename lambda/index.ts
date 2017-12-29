import { createServer, proxy } from 'aws-serverless-express';
import { app } from '../server/index';

const awsServerlessExpress = require('aws-serverless-express')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
