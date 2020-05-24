const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "development",
	entry: {
		"app": "./index.tsx"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			public: path.join(__dirname,'public/')
		}
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
						  modules: true,
						  importLoaders: 1
						}
					  },
					  'stylus-loader'
				],
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'url-loader?name=[name].[ext]'
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					}],
			}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html')
		}),
		new CopyPlugin([{
			from: path.resolve(__dirname,'public'),
			to:'public'
		}]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		  })
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 8000
	}
};