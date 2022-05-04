/* WEBPACK SCHEMA */

const path = require('path'), fs = require('fs');



class Webpack {

   constructor (filepath)
   {

        this.filepath = filepath;

        if (!fs.existsSync(path.join(filepath, '..\\resources\\buildSys\\webpack')))
            this.folder = fs.mkdirSync(path.join(filepath, '..\\resources\\buildSys\\webpack'));

        fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\webpack\\base.js'), this.base(), ()=>{});
        fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\webpack\\prod.js'), this.production(this.base()), ()=>{});
   }

//---------------------------------------------------------------

    base()
    {

        return (

            `
                const port = process.env.PORT || 8080;

                const webpack = require('webpack');
                const path = require('path');
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

    production (base)
    {
        return (
            `
            const { merge } = require("webpack-merge");
            const TerserPlugin = require("terser-webpack-plugin");
            //const CopyWebpackPlugin = require('copy-webpack-plugin');
    
    
            module.exports = merge(${base}, {
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

}



module.exports = { Webpack };
















/* class Webpack
{

   constructor (filepath)
   {

        this.filepath = filepath;

        if (!fs.existsSync('./extern/webpack')))
            fs.mkdirSync('./extern/webpack'));

        fs.writeFile('./extern/webpack\\base.js'), this.base(), (err)=> {console.log(err)});
        fs.writeFile('./extern/project\\prod.js'), this.production(), (err)=> {console.log(err)})
   }

//---------------------------------------------------------------

    base()
    {

        const port = process.env.PORT || 8080;

        const webpack = require('webpack');
        const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const { CleanWebpackPlugin } = require('clean-webpack-plugin');

        module.exports = {
        mode: 'development',
        devtool: 'eval-source-map',
        entry: `${'./extern/project\\game.js')}`,                            //'/project/game.js',   
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
                path.resolve(
                    __dirname, 
                    `${'./extern/project\\assets')}`, 
                    `${'./extern/project\\')}`
                )
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
            root: `${path.resolve(__dirname, './extern/project\\'))}`     //path.resolve(__dirname, '/project/')
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: `${'./extern/project\\index.html')}`        //'/project/index.html'
        }),
        ]
        }; 
        
    }

//------------------------------------------------------

    production ()
    {
        const { merge } = require("webpack-merge");
        const path = require("path");
        const base = require("./base");
        const TerserPlugin = require("terser-webpack-plugin");
        //const CopyWebpackPlugin = require('copy-webpack-plugin');


        module.exports = merge(base, {
        mode: "production",
        output: {
            filename: "../dist/bundle.min.js"
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
            //  patterns: [{ from: '${path.resolve(__dirname, './extern/project\\assets'))}', to: 'assets' }]
            // })
        ]
        }); 
    }

}



module.exports = { Webpack };
 */