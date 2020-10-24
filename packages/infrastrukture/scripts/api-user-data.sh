#!/bin/bash

sudo yum update -y

# Node and npm
sudo cd /home/ec2-user
su - ec2-user -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash"
su - ec2-user -c ". ~/.nvm/nvm.sh"
su - ec2-user -c "nvm install v14.8.0"

# Install git
sudo yum install git -y

# Clone codebase
cd /home/ec2-user
su - ec2-user -c "git clone https://github.com/oskarssylwan/webshop.git"
su - ec2-user -c "cd /home/ec2-user/webshop"

# Get .env file ssh token
aws s3 cp s3://env.webshop.oskarssylwan.com/.env /home/ec2-user/webshop/packages/api/.env

# Install dependencies
su - ec2-user -c "npm install --prefix webshop"
su - ec2-user -c "npm run install:api --prefix webshop"

# Install systemd service
cp /home/ec2-user/webshop-demo/packages/api/scripts/api.service /lib/systemd/system/

# Start services
su - ec2-user -c "sudo systemctl daemon-reload"
su - ec2-user -c "sudo systemctl start api.service"
