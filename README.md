# Tuffy Estates Web Client

## Live Builds (Demos)
[Stable](https://tuffyestates.netlify.com)
[Nightly](https://dev--tuffyestates.netlify.com)

## Developing
This will clone the [dev](https://github.com/tuffyestates/web-client/tree/dev) branch.
```
$ git clone git@github.com:tuffyestates/web-client.git -b develop    # Download the source
$ cd web-client    # Change to the newly downloaded web-client directory
```

Next you will need to start the docker containers.

##### Unix
```
$ ./run.sh    # Start the docker containers
```

##### Windows
```
$ run.bat    # Start the docker containers
```
Then the development environment should be accessible at [estates.localhost:8080](https://estates.localhost:8080).
