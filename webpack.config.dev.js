const path = require('path'); // YA VIENE CON NODE //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// CON EL COMANDO npx webpack --mode production --config webpack.config.js LE DIGO QUE EJECUTE Y USE LO QUE HAY EN ESTE FICHERO //
module.exports = {
    entry: './src/index.js', // ELEMENTO INICIAL DE MI APP //
    output: { // A DONDE ENVIAMOS LO QUE PREPARA WEBPACK //
        path: path.resolve(__dirname, 'dist'), // USO POR DEFECTO EL ESTANDAR 'dist' //
        filename: '[name].[contenthash].js', // TAMBIEN SE CONOCE COMO 'bundle.js'
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    }, // 'resolve()' PERMITE SABER DONDE ESTA EL DIRECTORIO/CARPETA //
    mode: 'development', // ACTIVO Y LE DIGO QUE ES PARA DESARROLLO ... //
    //watch: true, // ACTIVAR EL MODO "WATCH", SE QUEDA ESCUCHANDO A LOS CAMBIOS, SI USO UN DEV-SERVER ENTONCES NO VA, YA QUE TRAE UNO POR DEFECTO //
    resolve: {
        extensions: ['.js'], // EXTENSIONES DE ARCHIVOS PARA QUE LOS LEA //
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        } // ENTONCES AHORA SOLO IMPORTO EL @ALIAS/FICHERO PARA LLAMAR ARCHIVOS ...
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // EXPRESION REGULAR, DICE QUE CUALQUIER ARCHIVO QUE EMPIEZE CON 'm' (MODULE) O 'js' EL SIGNO '$' CIERRA Y '/' CIERRA INSTRUCCION
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource' // GENERO UN HASH PARA MIS ARCHIVOS Y ASI OPTIMIZA IMAGENES //
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/", // PORQUE EL CSS SE MOVIO
                        esModule: false,
                    },
                }
            }
        ]
    },
    // TOMA EL TEMPLATE Y LO TRANSFORMA CON LOS ELEMENTOS QUE LE INDIQUE, Y LO PONDRA EN LA CARPETA DE 'dist' (distribution) CON EL NOMBRE DE 'index.html' //
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name][contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress : true,
        historyApiFallback: true,
        port: 3006,
    },

/* PORQUE LA PERFORMANCE SE USARA FULL EN PRODUCCION ... //
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
*/
};