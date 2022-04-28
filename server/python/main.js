    /* MAIN NODE - PYTHON CONNECTION */

    const { spawn } = require('child_process')//, 
   // py = spawn('python', ['python/main.py']); 

    // let dataToSend = null;

    // //get data from script
    //     py.stdout.on('data', data => {
    //         console.log('pipe data from python script');
    //         dataToSend = data.toString();
    //     })
    //     .on('close', code => {
    //         console.log(`child process closed with code ${code}`);
    //     //send data to browser
    //         //res.send(dataToSend).sendFile(__dirname + '/index.html')
    //         console.log(dataToSend)
    //     })
        //.setEncoding.write('http://')


    function runPython()
    {
        spawn('python', ['python/main.py']);
        console.log('python running');
    }

    module.exports = { runPython }

