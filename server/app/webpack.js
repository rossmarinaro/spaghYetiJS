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

   base()
   {
    return (

        `
            const port = process.env.PORT || 8080;

            const webpack = require('webpack');
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            const { CleanWebpackPlugin } = require('clean-webpack-plugin');

            module.exports = {
            mode: 'development',
            devtool: 'eval-source-map',
            entry: "${path.join(this.filepath, '..\\resources\\buildSys\\project\\game.js')}",                            
            module: {
            // noParse: ["ws"],
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
                use: 'file-loader' ,
                exclude: [
                    "${path.resolve(
                        __dirname, 
                        path.join(this.filepath, '..\\resources\\buildSys\\project\\assets\\'), 
                        path.join(this.filepath, '..\\resources\\buildSys\\project\\'))
                    }"                                                                              
                ]
                },
                {
                test: /\.css$/i, 
                use: 
                    ['style-loader', 'css-loader']
                }
            ]
            },
            devServer: {
            port: port,
            proxy: { 
                '../socket.io.min.js': { 
                target: port, 
                ws: true 
                } 
            },
            },
            plugins: [
            new CleanWebpackPlugin({
                root: "${path.resolve(__dirname, path.join(this.filepath, '..\\resources\\buildSys\\project\\'))}"   
            }),
            new webpack.DefinePlugin({
                CANVAS_RENDERER: JSON.stringify(true),
                WEBGL_RENDERER: JSON.stringify(true)
            }),
            new HtmlWebpackPlugin({
                template: "${path.join(this.filepath, '..\\resources\\buildSys\\project\\index.html')}"
            }),
            ]
            }; 
        `
    );
   }



//------------------------------------------------------

    production ()
    {
        return (
            `
            const { merge } = require("webpack-merge");
            const base = require('${path.join(this.filepath, '..\\resources\\buildSys\\webpack\\base.js')}');
            const TerserPlugin = require("terser-webpack-plugin");
            //const CopyWebpackPlugin = require('copy-webpack-plugin');
    
    
            module.exports = merge(base, {
            mode: "production",
            output: {
                filename: "${path.join(this.filepath, '..\\resources\\buildSys\\dist\\bundle.min.js')}"
            },
            devtool: false,
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
                // new CopyWebpackPlugin({
                //  patterns: [{ from: './extern/project/assets', to: 'assets' }]
                // })
            ]
            }); 
            `
        );
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


        // return (     WORKS
        //     `
        //     module.exports = {
        //         entry: {
        //             main: "/project/game.js",
        //         },
        //         output: {
        //             path: "/dist",
        //             filename: 'bundle.min.js'
        //         }
                
        //     };
        //     `
        // );

        // return (
        //     `
        //     module.exports = {
        //         entry: {
        //             main: "/project/game.js",
        //         },
        //         output: {
        //             path: "C:/Users/Ross/AppData/Local/Programs/spaghyetijs/resources/buildSys/dist",
        //             filename: 'bundle.min.js'
        //         }
                
        //     };
        //     `
        // );
    }

}


module.exports = { WebpackConfig };









