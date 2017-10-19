var webpack             = require('webpack'),
path                    = require('path')
nodeExternals           = require('webpack-node-externals'),
FixDefaultImportPlugin  = require('webpack-fix-default-import-plugin');

//let excludes = nodeExternals();

module.exports = {
    entry: {
        'bluebutton': "./lib/bluebutton.js"
    },
    target: "node",
    devtool: 'source-map',
    //externals: [excludes],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        library: "bluebutton",
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new FixDefaultImportPlugin()
    ]
}