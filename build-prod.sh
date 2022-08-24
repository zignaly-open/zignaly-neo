cd packages/raffles-client
yarn
GENERATE_SOURCEMAP=false yarn build
cd ../raffles-server
pm2 restart zigraffle-api
#pm2 start yarn --name zigraffle-api -- start
