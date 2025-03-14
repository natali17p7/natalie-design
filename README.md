# natalie-homepage

How to test for build errors:

$> pnpm tsc

Build containers. Add -up flag to bring services up after build.

```sh
$> docker compose build
```


Bring containers up. Add -d flag to run output detached from current shell.

```sh
$> docker compose up
```


Bring containers down. Add -v flag to also delete named volumes

```sh
$> docker compose down
```


View logs by service name.

```sh
$> docker compose logs <service-name>
```


Enter shell for specified container (must be running)

```sh
$> docker exec -it <container-name> sh
```


Stop other containers in case port conflicts

``` sh
$> docker stop $(docker ps -a -q)
```

npm i -g corepack@latest

pnpm add -g npm-check-updates
ncu
ncu -u
