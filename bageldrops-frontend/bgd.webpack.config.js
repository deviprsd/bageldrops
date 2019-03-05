const BundleTracker = require('webpack-bundle-tracker');
const browserPlugin = require('webpack-browser-plugin');
//const chromeUserDataDir = 'your/path/here';

module.exports = {
    plugins:[
        new BundleTracker({filename: '../webpack.stats.frontend.json'})
    ],
    output: {
        path: require('path').resolve('../assets/bundles/bageldrops-frontend'),
        filename: "[name]-[hash].js",
        publicPath: "http://127.0.0.1:4200/"
    },
    devServer: {
        historyApiFallback: true,
        //publicPath: "http://127.0.0.1:4200/",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        }
    }
};
