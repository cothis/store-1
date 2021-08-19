import { Configuration } from 'webpack';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './public',
    port: 9000,
    historyApiFallback: true,
  },
};

export default devConfig;
