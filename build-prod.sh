cd packages/web
yarn
GENERATE_SOURCEMAP=false yarn build
cd ../server
pm2 restart zigraffle-api
#pm2 start yarn --name zigraffle-api -- start
