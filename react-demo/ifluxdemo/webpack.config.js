/**
 * Created by 杨惠宇 of666 on 2015/5/21 0021.
 */
'use strict'
var assetsViews = require('./assets-views');
var fs = require('fs');
var path = require('path');
var xmlDoc = require('xmldoc');

// 解决webpack打包, idea不能实时同步
//var projectRoot = path.join(__dirname, '../../../../../');
//var pomPath = path.join(projectRoot, 'pom.xml');
//console.log('开始扫描==>' + pomPath);
//var projectName = '';
//
//try {
//    // 获取web下面的pom文件中的version和artifactId
//    var pomXml = fs.readFileSync(pomPath);
//
//    var document = new xmlDoc.XmlDocument(pomXml);
//    var artifactId = document.valueWithPath('artifactId');
//    var version = document.valueWithPath('parent.version');
//    //projectName = artifactId + '-' + version;
//    projectName = artifactId;
//    console.log('扫描完毕==>artifactId=%s, version=%s', artifactId, version);
//} catch (err) {
//    console.log('没有发现maven项目的pom文件.');
//    throw err;
//}

// 打包的js存放路径，如果maven在target目录里生成了bossweb，则直接生成到target中，否则，生成到项目的/js/dist/
var targetPath = "./build";

module.exports = {
    entry: {
        'app':['babel-polyfill','app.js']
    },                 //打包的js
    resolve: {
        modulesDirectories: ['', 'common','node_modules']
    },
    output: {                                            //输出信息
        path: targetPath, //线上路径'./build/'
        filename: 'qianmi-[name].js',
        publicPath: '../build/' // 引用路径{$=app$}
    },

    module: {                                         //处理jsx的编译
        loaders: [
            {test: /\.js$/, loader: 'babel-loader?stage=0&blacklist=strict'}
        ]
    },
    devtool: 'source-map',
    plugins: [
        assetsViews({
            from: './views/',
            to: './views-to/'
        })
    ]
};