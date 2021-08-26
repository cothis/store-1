import { Configuration } from 'webpack';

import Dotenv from 'dotenv-webpack';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      safe: true,
      path: '.env.dev',
    }),
  ],
  devServer: {
    contentBase: './public',
    port: 9000,
    historyApiFallback: true,
  },
};

export default devConfig;
