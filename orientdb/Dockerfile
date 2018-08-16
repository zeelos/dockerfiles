FROM orientdb:3.0.6-tp3
MAINTAINER zeelos.io - https://zeelos.io

# initialize orientdb with 'zeelosdb' database
ADD ./databases/zeelosdb.tar.gz /orientdb/databases

# disable the build-in 'demosdb'
COPY ./gremlin-server.yaml /orientdb/config