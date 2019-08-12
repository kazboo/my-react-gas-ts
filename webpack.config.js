const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
    // モードの設定。指定可能な値: none, development, production(default)
    mode: 'production',
    context: path.resolve(__dirname, './src'),
    // アプリケーションが実行を開始されるポイント(エントリーポイント)
    entry: {
        entry: "./index.tsx",
    },
    // 含めるとGASのプロジェクトが重くて開かない。
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    node: {
        global: true,
        process: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ]
                }
            }
        ]
    },
    plugins: [
        new GasPlugin(),
        new Es3ifyPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
            // embed inline all javascript and css
            inlineSource: '.(js|css)$',
            minify: {
                // removeComments: true,
                // collapseWhitespace: true,
                // more options: https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CopyWebPackPlugin(
            [
                {
                    from: path.resolve(__dirname, 'src/'),
                    ignore: ['*.tsx', '*.html', '*.js']
                }
            ]
        )
    ]
};