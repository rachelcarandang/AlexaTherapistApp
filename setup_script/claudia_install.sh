#!/bin/sh
#download package
git clone ssh://git.amazon.com/pkg/RcarandaMusicHackday2018
cd RcarandaMusicHackday2018

#install claudia
echo "************************installing claudia***************************"
npm install 
sudo npm install claudia -g
echo "***********************exporting AWS keys***************************"
./export_aws_key.sh
source export_aws_key.sh
claudia create --region us-west-2 --handler main.handler --version skill
claudia allow-alexa-skill-trigger --version skill

