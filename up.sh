
#!/bin/bash
shopt -s globstar
set -e

bash pullImages.sh
docker-compose build
docker-compose up -d
