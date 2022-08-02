#!/bin/bash

cd /zignaly/packages/raffles-client
sudo yarn
GENERATE_SOURCEMAP=false sudo yarn build
cd ../raffles-server
sudo yarn