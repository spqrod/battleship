const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
      })
	],
    output: {
		clean: true,
        assetModuleFilename: '[name][ext]',
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
    devServer: {
		static: './dist',
	},
	optimization: {
		runtimeChunk: 'single',
	},
};