const Manifest = require('manifest-revision-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function (_path) {
	const rootAssetPath = _path + 'src';

	return {
		context: _path,
		devtool: 'source-map',
		output: {
			publicPath: '/',
			filename: '[name].[chunkhash].js'
		},
		plugins: [
			new CleanWebpackPlugin(['dist'], {
				root: _path,
				verbose: true,
				dry: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				minimize: true,
				warnings: false,
				sourceMap: false,
			}),
			new Manifest(path.join(_path + '/dist', 'manifest.json'), {
				rootAssetPath: rootAssetPath,
				ignorePaths: ['.DS_Store']
			}),
		]
	};
};