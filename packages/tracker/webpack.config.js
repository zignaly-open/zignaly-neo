const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'ufc',
    },
    globalObject: 'this',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-dts',
      },
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'package.json',
    //       to: 'package.json',
    //     },
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
        options: {
          // Ignore errors
          transpileOnly: true,
          configFile: __dirname + '/tsconfig.json',
          compilerOptions: {
            // declaration: true,
            // https://stackoverflow.com/a/61258647/1494428
            target: 'ES2018',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
};
