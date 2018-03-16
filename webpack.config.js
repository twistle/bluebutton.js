var path = require('path');
var nodeExternals = require('webpack-node-externals');
var FixDefaultImportPlugin  = require('webpack-fix-default-import-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'bluebutton': "./lib/bluebutton.js"
    },
    devtool: 'source-map',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        library: "bluebutton",
        libraryTarget: "umd"
    },
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', { "modules": false }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new FixDefaultImportPlugin()
    ]
}