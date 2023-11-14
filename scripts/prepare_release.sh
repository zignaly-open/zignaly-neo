#!/bin/bash

whoami;
ls -lah /
cd ~
pwd

APP_ENV="prod"

DEPLOYMENTPATH="/zignaly/{directory}"

mkdir -p $DEPLOYMENTPATH/deploy
