import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';

import commonConfig from './webpack/webpack.config.common';
import devConfig from './webpack/webpack.config.dev';
import prodConfig from './webpack/webpack.config.prod';

const config: Configuration = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
export default merge(commonConfig, config);
