/*
* @Author: purain
* @Date:   2019-05-13 19:00:00
*/

const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' 
        ? '/dist/' : '//s.purain.xyz/admin/dist/',
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      page     : path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util     : path.resolve(__dirname, 'src/util'),
      service  : path.resolve(__dirname, 'src/service')
    }
  },
  module: {
  	rules: [
  	  //react(jsx)
  	  {
  	    test: /\.m?jsx$/,
  	    exclude: /(node_modules)/,
  	    use: {
  	      loader: 'babel-loader',
  	      options: {
  	        presets: ['env', 'react']
  	      }
  	    }
  	  },
  	  // css
  	  {
  	  	test: /\.css$/,
  	  	use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
  	  },
  	  // sass
  	  {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        // 图片的配置
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              }
            }
          ]
        },
        // 字体处理
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              }
            }
          ]
        }
  	]
  },
  plugins: [
    // 处理 html 文件
  	new HtmlWebpackPlugin({
  		template: './src/index.html',
      favicon: './favicon.ico'
  	}),
  	// 独立 css 文件
  	new ExtractTextPlugin("css/[name].css"),
  	// 提出公共模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name : 'common',
  		filename : 'js/base.js'
  	})
  ],
  devServer: {
  	port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/manage/statistic/base_count.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
};