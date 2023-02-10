<<<<<<< HEAD
/* WEBPACK SCHEMA */


class WebpackConfig {

   constructor (fs, path, gm)
   {
       this.fs = fs;
       this.path = path;
       this.gm = gm;
   }

//----------------------------------- build game

    buildGame(content)
    {
        const gameData = JSON.parse(content.data),
              filepath = content.path;

    ////create project directory

        if (!this.fs.existsSync(this.path.join(filepath, this.gm.baseDir + 'project')))
            this.fs.mkdirSync(this.path.join(filepath, this.gm.baseDir + 'project'));

    //write project files

        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'project/index.html'), this.gm.markup(), ()=> {});
        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'project/game.js'), this.gm.script(gameData), ()=> {}); // or appendFile

    //generate build script

        console.log('building project...');
        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'build.js'), this.schema(), ()=>{});

    //run sh scripts, instantiate webpack / build app
        
        require('child_process').exec (

        `cd ${this.path.join(filepath, this.gm.baseDir)} && build.sh`, 
            
            (err, stout, sterr) => {
                if (err)
                    console.log('exe err: ', err);
                console.log(stout, sterr);
            });
    }

//----------------------------------------------

    schema()
    {

        const dirpath = '/my_cool_game';

        return (

            `
                const webpack = require('webpack'),
                TerserPlugin = require("terser-webpack-plugin"),
                CopyPlugin = require('copy-webpack-plugin'),
                HtmlWebpackPlugin = require('html-webpack-plugin');

                module.exports = {
                    entry: {
                        main: "/project/game.js",
                    },
                    output: {
                        path: "${dirpath}",
                        filename: 'bundle.min.js'
                    },
                    
                    // module: {
                    //     rules: [
                    //         // {
                    //         // test: /\.js$/,
                    //         // exclude: /node_modules/,
                    //         // use: {
                    //         //     loader: 'babel-loader'
                    //         // }
                    //         // },
                    //         // {
                    //         // test: [/\.vert$/, /\.frag$/],
                    //         // use: 'raw-loader'
                    //         // },
                    //         // {
                    //         // test: /\.(gif|png|ogg|jpe?g|svg|xml|mp3|woff)$/i, 
                    //         // use: 'file-loader' 
                    //         // },
                    //         // {
                    //         // test: /\.css$/i, 
                    //         // use: 
                    //         //     ['style-loader', 'css-loader']
                    //         // }
                    //     ]
                    // },

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
                        new CopyPlugin({
                            patterns: [
                                { from: './project/assets', to: "${dirpath}/assets/" }
                                //, { from: 'pwa', to: '' },
                                // { from: 'src/img/logo.ico', to: '' }
                            ]
                        })
                    ]
                };

            `
        );

    }

}


module.exports = { WebpackConfig };









=======
/* WEBPACK SCHEMA */


class WebpackConfig {

   constructor (fs, path, gm)
   {
       this.fs = fs;
       this.path = path;
       this.gm = gm;
   }

//----------------------------------- build game

    buildGame(content)
    {
        const gameData = JSON.parse(content.data),
              filepath = content.path;

    ////create project directory

        if (!this.fs.existsSync(this.path.join(filepath, this.gm.baseDir + 'project')))
            this.fs.mkdirSync(this.path.join(filepath, this.gm.baseDir + 'project'));

    //write project files

        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'project/index.html'), this.gm.markup(), ()=> {});
        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'project/game.js'), this.gm.script(gameData), ()=> {}); // or appendFile

    //generate build script

        console.log('building project...');
        this.fs.writeFile(this.path.join(filepath, this.gm.baseDir + 'build.js'), this.schema(), ()=>{});

    //run sh scripts, instantiate webpack / build app
        
        require('child_process').exec (

        `cd ${this.path.join(filepath, this.gm.baseDir)} && build.sh`, 
            
            (err, stout, sterr) => {
                if (err)
                    console.log('exe err: ', err);
                console.log(stout, sterr);
            });
    }

//----------------------------------------------

    schema()
    {

        const dirpath = '/my_cool_game';

        return (

            `
                const webpack = require('webpack'),
                TerserPlugin = require("terser-webpack-plugin"),
                CopyPlugin = require('copy-webpack-plugin'),
                HtmlWebpackPlugin = require('html-webpack-plugin');

                module.exports = {
                    entry: {
                        main: "/project/game.js",
                    },
                    output: {
                        path: "${dirpath}",
                        filename: 'bundle.min.js'
                    },
                    
                    // module: {
                    //     rules: [
                    //         // {
                    //         // test: /\.js$/,
                    //         // exclude: /node_modules/,
                    //         // use: {
                    //         //     loader: 'babel-loader'
                    //         // }
                    //         // },
                    //         // {
                    //         // test: [/\.vert$/, /\.frag$/],
                    //         // use: 'raw-loader'
                    //         // },
                    //         // {
                    //         // test: /\.(gif|png|ogg|jpe?g|svg|xml|mp3|woff)$/i, 
                    //         // use: 'file-loader' 
                    //         // },
                    //         // {
                    //         // test: /\.css$/i, 
                    //         // use: 
                    //         //     ['style-loader', 'css-loader']
                    //         // }
                    //     ]
                    // },

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
                        new CopyPlugin({
                            patterns: [
                                { from: './project/assets', to: "${dirpath}/assets/" }
                                //, { from: 'pwa', to: '' },
                                // { from: 'src/img/logo.ico', to: '' }
                            ]
                        })
                    ]
                };

            `
        );

    }

}


module.exports = { WebpackConfig };









>>>>>>> b96c1d3add77e89787827d315c8408560f58b360
