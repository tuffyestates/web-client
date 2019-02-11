# Tuffy Estates Web Client

## Developing
This will clone the [dev](https://gitlab.com/tuffyestates/user-client/tree/dev) branch.
```
git clone git@github.com:tuffyestates/user-client.git -b dev
cd web-client
./run.sh
```
Then the development environment should be accessible at [localhost:8080](http://localhost:8080).

## Compiling for Production
This will clone the [master](https://gitlab.com/tuffyestates/user-client) branch.
```
git clone git@gitlab.com:tuffyestates/user-client.git
cd user-client
npm build
cd build
```
