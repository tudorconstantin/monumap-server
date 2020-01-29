## Start the project for development
* `git clone https://gitlab.prforge.com/tudor/monumap`
* `cd monumap`
* `docker-compose -f docker-compose.yml -f docker-compose.dev.yml build`
* `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

## Notes
If docker complains that network traefik-public doesn't exist, create it with `docker network create traefik-public`

Images should be accessible at relative path `/images/CJ-II-a-A-07240/DSC_3408.jpg`