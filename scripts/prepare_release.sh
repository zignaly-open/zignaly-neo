#!/bin/bash

DEPLOYMENTPATH="~/{directory}"

whoami;
echo $DEPLOYMENTPATH;
cd ~
pwd
ls -la
mkdir -p $DEPLOYMENTPATH/deploy
