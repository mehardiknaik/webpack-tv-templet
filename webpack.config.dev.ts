import { DefinePlugin, Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import commonConfig from './webpack.config.common';
import { merge } from 'webpack-merge';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[hash:5][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[hash:5][ext]'
        }
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                localIdentName: '[path][name]__[local]___[hash:5]',
                exportLocalsConvention: 'camelCase'
              }
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      __DEV__: JSON.stringify(true),
      __PROD__: JSON.stringify(false),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __PLATFORM__: JSON.stringify(process.env.PLATFORM || 'web')
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true
  }
};

export default merge<Partial<Configuration>>(commonConfig, config);
