#!/bin/bash

APP_ENV="prod"

DEPLOYMENTPATH="/zignaly/{directory}"

cd $DEPLOYMENTPATH/releases

DIRCOUNT=$(ls . | wc -l)
DIRCOUNT=$(($DIRCOUNT+0))

if [ $DIRCOUNT -gt 1 ];
then
    sudo rm -rf "$(ls -t | tail -1)"
fi