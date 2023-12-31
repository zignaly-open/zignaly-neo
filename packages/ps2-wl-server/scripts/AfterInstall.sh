#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}"
\. "$HOME/.nvm/nvm.sh"
sudo chown -R admin:admin $DEPLOYMENTPATH
cd $DEPLOYMENTPATH
cd deploy
yarn
yarn lerna bootstrap --scope=@zignaly-open/ps2-wl-server
