const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: {
		"app": "./src/index.tsx"
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
		}])
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 8000
	}
};