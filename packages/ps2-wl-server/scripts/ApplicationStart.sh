#!/bin/bash

DEPLOYMENTPATH="$HOME/{directory}"
\. "$HOME/.nvm/nvm.sh"
# Change permissions
sudo chown -R admin:admin $DEPLOYMENTPATH/deploy

cd $DEPLOYMENTPATH/deploy/packages/ps2
npm i express serve-static


