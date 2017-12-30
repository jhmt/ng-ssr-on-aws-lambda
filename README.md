# Angular Server Side Rendering on AWS Lambda

### prerequesite
* Node.js (version 6.9.1 or upper)
* AWS account (for deploying to AWS Lambda)

### Used frameworks/technologies
* Angular CLI
* Webpack
* Express
* Serverless framework

## Get Started
```sh
git clone https://github.com/jhmt/ng-ssr-on-aws-lambda.git
npm install
npm run build:ssr && npm run serve:ssr
```
* Deploy dev stage ```npm run build:ssr-dev && npm run deploy:dev```
* Deploy prod stage ```npm run build:ssr-prod && npm run deploy:prod```
## Deploy on AWS Lambda
```sh
npm run build:deploy
```
## To do

