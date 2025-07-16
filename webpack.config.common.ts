import { Configuration, ProvidePlugin, WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ConfigWebpackPlugin from './scripts/ConfigWebpackPlugin';

const platform = process.env.PLATFORM || 'web';

const config: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|mjs)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [
      `.${platform}.js`,
      `.${platform}.jsx`,
      `.${platform}.tsx`,
      `.${platform}.ts`,
      '.tsx',
      '.ts',
      '.jsx',
      '.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    new ProvidePlugin({
      React: 'react'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }]
    }),
    new DotenvWebpackPlugin({
      defaults: true,
      allowEmptyValues: true,
      safe: true
    }),
    new ProgressBarPlugin() as WebpackPluginInstance,
    new ConfigWebpackPlugin({
      input: './src/config.ts',
      outputFileName: 'config.js'
    })
  ]
};

export default config;
