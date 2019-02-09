# Tuffy Estates Web Client

## Live Builds (Demos)
[Stable](https://tuffyestates.netlify.com)
[Nightly](https://dev--tuffyestates.netlify.com)

## Developing
This will clone the [dev](https://gitlab.com/tuffyestates/user-client/tree/dev) branch.
```
git clone git@github.com:tuffyestates/web-client.git -b dev
cd user-client
npm install
npm start
```
Then the development environment should be accessible at [estates.localhost:8080](http://estates.localhost:8080).

## Compiling for Production
This will clone the [master](https://gitlab.com/tuffyestates/user-client) branch.
```
git clone git@gitlab.com:tuffyestates/user-client.git
cd user-client
npm install
npm build
cd build
```
