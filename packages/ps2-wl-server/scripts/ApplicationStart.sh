#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}/deploy"
cd $DEPLOYMENTPATH
\. "$HOME/.nvm/nvm.sh"

pm2 restart npm --name "zignaly-wl" -- start
