#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"

cd $DEPLOYMENTPATH/deploy
sudo yarn --scope=@zignaly-open/raffles-client --include-dependencies
sudo yarn lerna run build --scope=@zignaly-open/raffles-client --include-dependencies

sudo cp -r $DEPLOYMENTPATH/deploy $DEPLOYMENTPATH/temp
sudo mv -f $DEPLOYMENTPATH/temp $DEPLOYMENTPATH/release