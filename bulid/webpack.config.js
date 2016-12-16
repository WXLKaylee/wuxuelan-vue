// nodejs中的path模块
var path = require('path');

module.exports = {
	// 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
	entry: {
		'main': './app/index/index'
	},

	//输出配置
	output: {
		//输出路径是 myProject/output/static
		path: './static',
		publicPath: 'static/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue']
	},
	module: {
		loaders: [
		    //使用vue－loader 加载 .vue 后缀文件
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	},
	babel: {
		presets: ['es2015', 'stage-3'],
		plugins: ['transform-runtime']
	}
}