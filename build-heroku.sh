echo "Do not use it in prod or I will come for you"
cd packages/web || exit 1
yarn
GENERATE_SOURCEMAP=false yarn build
cd ../server || exit 1
yarn
yarn start
