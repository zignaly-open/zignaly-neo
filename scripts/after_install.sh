#!/bin/bash

cd /zignaly/packages/web
sudo yarn
GENERATE_SOURCEMAP=false sudo yarn build
cd ../server
sudo yarn