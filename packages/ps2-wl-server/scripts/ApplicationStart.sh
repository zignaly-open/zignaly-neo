#!/bin/bash

DEPLOYMENTPATH="/zignaly/{directory}/deploy"
cd $DEPLOYMENTPATH
\. "$HOME/.nvm/nvm.sh"

# there's probably an easier way of doing this
if [ `pm2 list | grep zignaly-wl | wc -l | awk '{print $1}'` -ge "1" ]; then
  pm2 restart zignaly-wl
else
  pm2 start yarn --interpreter bash --name "zignaly-wl" -- start
fi
