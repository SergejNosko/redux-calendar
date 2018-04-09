const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app',
        facade: './src/facade',
        styles: './src/public/styles/style.scss',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                    },
                }],
            }, {
                test: /.(ttf|otf|eot|woff(2)?)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    path.resolve(process.cwd(), 'assets/vendor'),
                                ],
                            },
                        },
                    ],
                }),
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
    ],
};
