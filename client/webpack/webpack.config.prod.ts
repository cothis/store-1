import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

const prodConfig: Configuration = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      safe: true,
      path: '.env.prod',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default prodConfig;
