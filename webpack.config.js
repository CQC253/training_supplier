const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path

module.exports = (env) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
    return {
        mode: 'development',
        devServer: {
            port: 9003,
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
        },
        resolve: {
            modules: ['src', 'node_modules'],
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
                {
                    test: /\.(scss|css)$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/i,
                    use: ['sass-loader'],
                },
                {
                    test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
                    use: [{
                        loader: 'file-loader?name=[name].[ext]',
                        options: {},
                    }],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new ModuleFederationPlugin(
                {
                    name: 'SAMPLE',
                    filename: 'remoteEntry.js',
                    exposes: {
                        './App': './src/App',
                    },

                    shared: [
                        {
                            ...deps,
                            react: {
                                singleton: true,
                                requiredVersion: deps['react']
                            },
                            'react-dom': {
                                singleton: true,
                                requiredVersion: deps['react-dom']
                            },
                            'react-router-dom': {
                                singleton: true,
                                requiredVersion: deps['react-router-dom']
                            },
                        },
                    ],
                },
            ),
            new HtmlWebpackPlugin({
                template:
                    './public/index.html',
                minify: true,
                hash: true
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
    }
};
