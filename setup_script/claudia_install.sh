#!/bin/sh
#download package

#install claudia
echo "************************installing claudia***************************"
npm install 
sudo npm install claudia -g
echo "***********************exporting AWS keys***************************"
./export_aws_key.sh
source export_aws_key.sh
claudia create --region us-west-2 --handler AlexaApp.handler --version skill
claudia allow-alexa-skill-trigger --version skill

