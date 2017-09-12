const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: './js/main.bundle.js'
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		},
		{
			test: /\.(scss|sass|css)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader','sass-loader'],
			})
		}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 9000,
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Site',
			template: './src/index.html'
		}),
		new ExtractTextPlugin(
		{
			filename: './css/style.css',
			disable: false,
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/assets/'),
				to: path.resolve(__dirname, 'build/assets'),
			}
		])
	]
}