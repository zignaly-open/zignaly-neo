#!/bin/bash


DEPLOYMENTPATH="~/{directory}"

whoami;
echo $DEPLOYMENTPATH;
cd ~
pwd
ls -la



# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

# Install server
cd $DEPLOYMENTPATH/deploy/packages/ps2
npm i express serve-static

