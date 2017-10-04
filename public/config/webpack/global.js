const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const Manifest = require('manifest-revision-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPublic = path.resolve('./src');
const NODE_ENV = process.env.NODE_ENV || "production";
const DEVELOPMENT = NODE_ENV === "production" ? false : true;
const stylesLoader = 'css-loader?root=' + rootPublic + '&sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true';

module.exports = function (_path) {
	const rootAssetPath = _path + 'src';

	const webpackConfig = {
		entry: {
			bundle: _path + '/src/app/entry'
		},
		output: {
			path: _path + '/dist',
			filename: '[name].js',
			publicPath: '/'
		},
		resolve: {
			extensions: ['.js', '.es6', '.jsx', '.scss', '.css'],
			alias: {
				_appRoot: path.join(_path, 'src', 'app'),
				_images: path.join(_path, 'src', 'assets', 'images'),
				_stylesheets: path.join(_path, 'src', 'assets', 'styles'),
				_scripts: path.join(_path, 'src', 'assets', 'js')
			}
		},
		module: {
			rules: [{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							attrs: ['img:src', 'img:data-src']
						}
					}
				]
			},
				//{
				//	test: /\.js$/,
				//	exclude: [
				//		path.resolve(_path, "node_modules")
				//	],
				//	enforce: 'pre',
				//	use: [
				//		{
				//			loader: 'eslint-loader'
				//		}
				//	]
				//},
				{
					test: /\.js$/,
					//exclude: [
					//	path.resolve(_path, "node_modules/*")
					//],
					//include:[
					//	path.resolve(_path, "node_modules/bootstrap")
					//],
					use: [
						{
							loader: 'babel-loader',
							options: {
								cacheDirectory: false
							}
						},
						//{
						//	loader: 'baggage-loader?[file].html&[file].css'
						//}
					]
				}, {
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader?sourceMap'
						},
						{
							loader: 'postcss-loader'
						}
					]
				}, {
					test: /\.(scss|sass)$/,
					loader: DEVELOPMENT ? ('style-loader!' + stylesLoader) : ExtractTextPlugin.extract({
						fallbackLoader: "style-loader",
						loader: stylesLoader
					})
				}, {
					test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								name: 'assets/fonts/[name]_[hash].[ext]'
							}
						}
					]
				}, {
					test: /\.(jpe?g|png|gif)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								name: 'assets/images/[name]_[hash].[ext]',
								limit: 10000
							}
						}
					]
				}
			]
		},

		// load plugins
		plugins: [
			new webpack.LoaderOptionsPlugin({
				options: {
					// PostCSS
					postcss: [autoprefixer({ browsers: ['last 5 versions'] })],
				}
			}),
			new webpack.ProvidePlugin({

				$: 'jquery',
				jQuery: 'jquery',
				'Kinetic': 'kinetic',
				'classie': '/home/apushkar/WebstormProjects/retina/public/src/app/libs/classie.js',
				//'window.jQuery': 'jquery',
				//'window.jquery': 'jquery',

			}),
			new webpack.DefinePlugin({
				'NODE_ENV': JSON.stringify(NODE_ENV)
			}),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new webpack.optimize.AggressiveMergingPlugin({
				moveToParents: true
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common',
				async: true,
				children: true,
				minChunks: Infinity
			}),
			new Manifest(path.join(_path + '/config', 'manifest.json'), {
				rootAssetPath: rootAssetPath,
				ignorePaths: ['.DS_Store']
			}),
			new ExtractTextPlugin({
				//filename: 'styles/css/[name]' + (NODE_ENV === 'development' ? '' : '.[chunkhash]') + '.css',
				filename: 'styles/[name]' + (NODE_ENV === 'development' ? '' : '') + '.css',
				allChunks: true
			}),
			new CopyWebpackPlugin([{
				from: 'src/assets', to: path.join(_path, 'dist', 'assets')
			}], {})
			//new HtmlWebpackPlugin({
			//  filename: 'index.html',
			//  template: path.join(_path, 'src', 'tpl-index.ejs')
			//})
		]
	};

	return webpackConfig;

};
