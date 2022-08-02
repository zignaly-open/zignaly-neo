#!/bin/bash

cd /zignaly/packages/raffles-client
sudo yarn
sudo yarn build
cd ../raffles-server
sudo yarn
