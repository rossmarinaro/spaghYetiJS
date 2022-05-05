/* WEBPACK SCHEMA */

const path = require('path'), fs = require('fs');



class WebpackConfig {

   constructor (filepath)
   {

        this.filepath = filepath;

        // if (!fs.existsSync(path.join(filepath, '..\\resources\\buildSys\\webpack')))
        //     fs.mkdirSync(path.join(filepath, '..\\resources\\buildSys\\webpack'));

        // fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\webpack\\build.js'), this.build(), ()=>{});
        
        fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\build.js'), this.build(), ()=>{});
   }

    build()
    {

        const filepath = '/my_cool_game' //'C:/Users/Ross/AppData/Local/Programs/spaghyetijs/resources/buildSys/dist'//path.join(this.filepath, '../resources/buildSys/dist/bundle.min.js')//path.resolve(__dirname, '/dist/bundle.min.js');

        // for (let char in filepath)
        //     if (char === '/\\/')
                //filepath.replaceAll('\\', '/');

        return (

            `

            const TerserPlugin = require("terser-webpack-plugin");
            const webpack = require('webpack');
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    
            module.exports = {
                entry: {
                    main: "/project/game.js",
                },
                output: {
                    path: "${filepath}",
                    filename: 'bundle.min.js'
                },
                
                module: {
                    rules: [
                        {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                        },
                        {
                        test: [/\.vert$/, /\.frag$/],
                        use: 'raw-loader'
                        },
                        {
                        test: /\.(gif|png|ogg|jpe?g|svg|xml|mp3|woff)$/i, 
                        use: 'file-loader' 
                        },
                        {
                        test: /\.css$/i, 
                        use: 
                            ['style-loader', 'css-loader']
                        }
                    ]
                },

                performance: {
                    maxEntrypointSize: 900000,
                    maxAssetSize: 900000
                },
                optimization: {
                    minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                        output: {
                            comments: false
                        }
                        }
                    })
                    ]
                },

                plugins: [
            
                    new webpack.DefinePlugin({
                        CANVAS_RENDERER: JSON.stringify(true),
                        WEBGL_RENDERER: JSON.stringify(true)
                    }),
                    new HtmlWebpackPlugin({
                        template: "./project/index.html"
                    }),
                ]
            };

            `
        );

    }

}


module.exports = { WebpackConfig };









