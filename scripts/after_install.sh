#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

cd $DEPLOYMENTPATH
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn lerna run build --scope=@zignaly-open/raffles-client --include-dependencies
