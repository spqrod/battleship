const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
	entry: {
		index: './src/index.js',
		ship: './src/factories/ship.js',
		gameBoard: './src/factories/gameBoard.js',
		player: './src/factories/player.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
            {
                test: /\.html$/,
                use:
                {
                    loader: 'html-loader'
                }
            },
            {
				test: /\.css$/i,
				use: [
					'style-loader', 'css-loader'
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
      })
	],
    devServer: {
		static: './dist',
	},
	optimization: {
		runtimeChunk: 'single',
	},
};