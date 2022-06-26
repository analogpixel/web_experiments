default:
  just --list

build:
  docker build -t nginx_test .

run:
  #!/usr/local/bin/bash
  pwd=`pwd`
  echo $pwd
  docker run --rm -p 8080:8080 --name nginx-test -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx_test

stop:
  docker stop nginx-test

