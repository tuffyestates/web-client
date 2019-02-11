# Tuffy Estates Web Client

## Live Builds (Demos)
[Stable](https://tuffyestates.netlify.com)
[Nightly](https://dev--tuffyestates.netlify.com)

## Setup Development Environment
This will clone the [develop](https://github.com/tuffyestates/web-client/tree/develop) branch.
```sh
$ git clone git@github.com:tuffyestates/web-client.git -b develop    # Download the source
$ cd web-client    # Change to the newly downloaded web-client directory
```

Next you will need to start the docker containers.

##### Unix
```sh
$ ./run.sh    # Start the docker containers
```

##### Windows
```sh
$ run.bat    # Start the docker containers
```

Then the development environment should be accessible at [https://estates.localhost:8080](https://estates.localhost:8080).

## Developing

Before developing, you should always branch off of the `develop` to ensure your changes aren't impeded by other developers' changes. To create a new branch off of `develop`, first make sure you are on the `develop` branch.

```sh
$ git status
On branch develop
...
```

Next ensure you are using the most up to date develop branch using a `git pull`.

```sh
$ git pull
Already up to date.
```

Finally you can branch off using `git checkout -b <branch>`. Be sure to replace `<branch>` with something relevant to changes you will be making. For example, if I am going to add a feature where users can login with their emails as well as their usernames, I might use the following command.

```sh
$ git checkout -b feature/email-login
Switched to a new branch 'feature/email-login'
```

Now you make make changes and push those changes to github as you wish.

### Merging back into develop

So that other developers may track what work you are doing on implementing a change, you may create a pull request prefixed with `WIP: ` before you are ready to merge back into the `develop` branch.

You may create a pull request at: https://github.com/tuffyestates/web-client/compare.

For example I may name my pull request `WIP: Add ability to login with email`. From then on all changes will be recorded in this pull request. Other aspects of the pull request such as comments, requests for changes, and reviewers will be listed in this pull request.

Once you are ready to merge these changes into the `develop` branch you may edit the pull request's title to remove the `WIP: ` prefix.
