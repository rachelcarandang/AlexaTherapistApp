#/bin/sh

#create upload alias
echo "alias upload='node upload.js'" >> ~/.bash_profile

#install aws cli
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
#set aws credentials
aws configure

npm install 
sudo npm install claudia -g

#create AWS Lambda function
claudia create --region us-west-2 --handler AlexaApp.handler --version skill
LAMBDA_INFO=$(claudia allow-alexa-skill-trigger --version skill);

#get Lambda arn id from output
echo $LAMBDA_INFO | sed -n "s/^.*\(arn.*\)\".*$/\1/p" >> ~/Documents/endpoint.txt
cat ~/Documents/endpoint.txt
