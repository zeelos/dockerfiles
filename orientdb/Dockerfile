FROM orientdb:3.0.18-tp3
LABEL maintainer="dev@zeelos.io" description="OrientDB - Distributed Multi-Model and Graph Database (with zeelosdb built-in)"

# initialize orientdb with 'zeelosdb' database
ADD ./databases/zeelosdb.tar.gz /orientdb/databases

# disable the build-in 'demosdb'
COPY ./gremlin-server.yaml /orientdb/config
