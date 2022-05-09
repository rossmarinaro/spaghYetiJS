# spagYetiJS

## tool to streamline the production of html5 games

*built with webpack, node, and electron*


![image info](./server/public/img/icon.png)


###client gets bundled and placed in public folder located in the server directory

** How to run for development **

1. `cd server/app`. uncomment the window console debugger in the electron.js file.
2. change the baseDir filepath in preload.js to avoid directory not found errors.
3. `electron .`


** How to build **

1. `cd server && npm run build`
2. navigate to "dist" folder in server
3. click on the installer to init install process.


