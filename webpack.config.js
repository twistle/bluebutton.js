var webpack             = require('webpack'),
path                    = require('path')
nodeExternals           = require('webpack-node-externals'),
FixDefaultImportPlugin  = require('webpack-fix-default-import-plugin');

let excludes = nodeExternals({
whitelist: ["bluebutton"]
});

/*excludes.lodash = {
commonjs: 'lodash',
commonjs2: 'lodash',
amd: '_',
root: '_'
};*/

module.exports = {
entry: {
    'bluebutton': "./lib/bluebutton.js"
},
target: "node",
devtool: 'source-map',
externals: [excludes],
output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    library: "bluebutton",
    libraryTarget: "commonjs"
},
resolve: {
    extensions: ['.scss', '.ts', '.tsx', '.js']
},
plugins: [
    new FixDefaultImportPlugin()
]
}