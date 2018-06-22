#!/bin/sh

source aws_credentials.txt 
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
echo $AWS_DEFAULT_REGION
echo "********************finish exporting AWS credentials**********************"
