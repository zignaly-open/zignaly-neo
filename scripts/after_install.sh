#!/bin/bash

DEPLOYMENTPATH="{directory}"

cd $DEPLOYMENTPATH
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn lerna run build --scope=@zignaly-open/raffles-client --include-dependencies
# sudo pm2 restart zigraffle-api
