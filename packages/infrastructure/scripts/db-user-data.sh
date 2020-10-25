#!/bin/bash
sudo yum update -y

# Install docker and docker-compose
yum install docker -y
service docker start
usermod -a -G docker ec2-user

# Start MongoDB in container
su - ec2-user -c "docker run -p 27017:27017 --name mongodb mongo"
