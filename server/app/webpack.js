/* WEBPACK SCHEMA */


class WebpackConfig {

   constructor (fs, path, baseDir)
   {
       this.fs = fs;
       this.path = path;
       this.baseDir = baseDir;
   }

//----------------------------------- build game

    buildGame(e)
    {
        const gameData = JSON.parse(e.data),
              filepath = e.path;

    ////create project directory

        if (!this.fs.existsSync(path.join(filepath, this.baseDir + 'project')))
            this.fs.mkdirSync(path.join(filepath, this.baseDir + 'project'));

    //write project files

        this.fs.writeFile(path.join(filepath, this.baseDir + 'project/index.html'), gm.markup(), ()=> {});
        this.fs.writeFile(path.join(filepath, this.baseDir + 'project/game.js'), gm.script(gameData), ()=> {}); // or appendFile

    //generate build script

        this.generateBuildScript(filepath);

    //run sh scripts, instantiate webpack / build app
        
        require('child_process').exec (

        `cd ${path.join(filepath, baseDir)} && build.sh`, //local: `cd extern && npm run build`
            
            (err, stout, sterr) => {
                if (err)
                    console.log('exe err: ', err);
                console.log(stout, sterr);
            });
    }

//----------------------------------------------

    generateBuildScript(filepath)
    {
        console.log('building project...');
        this.fs.writeFile(this.path.join(filepath, this.baseDir + 'build.js'), this.schema(), ()=>{});
    }

//----------------------------------------------

    schema()
    {

        const filepath = '/my_cool_game';

        return (

            `
                const webpack = require('webpack'),
                TerserPlugin = require("terser-webpack-plugin"),
                HtmlWebpackPlugin = require('html-webpack-plugin');

                module.exports = {
                    entry: {
                        main: "/project/game.js",
                    },
                    output: {
                        path: "${filepath}",
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
                    ]
                };

            `
        );

    }

}


module.exports = { WebpackConfig };









