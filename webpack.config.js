//导入模块
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");                 //单独打包css
var htmlWebpackPlugin = require('html-webpack-plugin');                         //自动生成html
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");    //提取公共代码


//定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, './src/js/index.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


module.exports = {
    //页面入口文件配置,默认为index.js
    entry: {
        index: SRC_PATH
        //page1:  SRC_PATH+"/page1.js",
        //page2:  SRC_PATH+"/page2.js"
    },

    //入口文件输出配置
    output: {
        path: BUILD_PATH,//输出文件的保存路径(使用绝对路径)
        publicPath:"http://localhost:8080",
        filename: "js/[name].js"           //最终生成文件名

    },
    plugins: [
        //自动生成html
        new htmlWebpackPlugin({
            filename:'/html/index.html',            //通过模板生成的文件名
            template:'./src/html/index.html',      //模板路径
            inject:true,               //是否自动在模板文件添加 自动生成的js文件链接
            title:'这个是WebPack Demo',
            minify:{
                removeComments:true //是否压缩时 去除注释
            }
        }),

        //抽取出来的css文件的命名将会是参数中name的值，而js文件名则会是filename的值
        //new CommonsChunkPlugin({ name: 'vendor',filename: ["index","page1","page2"] }),
        //new CommonsChunkPlugin("commons.js", ["page3", "page4", "admin-commons.js"]),

        //单独打包css
        new ExtractTextPlugin('css/[name].css'),
        //压缩代码
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/

        //挂载第三方插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //自动补全css
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        })


    ],

    //热加载
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' })
            },
             {
                test: /\.(png|jpg)$/,
                loaders: 'url-loader?limit=40000&name=images/[hash:8].[name].[ext]'       //图片小于这个限制的时候，会自动启用base64编码图片
            },
        ]
    },
    /*externals:{
     // require("jquery") 是引用自外部模块的
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
     }*/
};