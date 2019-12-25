const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin') 
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode:"development",
	entry: {
		"app": "./src/index.tsx"
	},
	resolve:{
		extensions:[".ts",".tsx",".js",".css"] 
	},
	output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
	module: {
		rules:[
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
					use: ['style-loader','css-loader'] 
					},
            		{
                	enforce: "pre",
                	test: /\.js$/,
                	loader: "source-map-loader"
            		},
					{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: 'url-loader?name=[name].[ext]'
					}]
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,'index.html')
		})
		],
	devServer:{
		contentBase: path.join(__dirname,'build','web'),
		compress:true,
		port: 9000
	}
   };
