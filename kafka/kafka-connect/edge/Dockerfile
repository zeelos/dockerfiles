FROM zeelos/kafka-connect-standalone:4.1.1-arm32v7
MAINTAINER zeelos.io - https://zeelos.io

# add Replicator connector
RUN apt-get -qq update && \
    apt-get install -y \
        confluent-kafka-connect-replicator && \
     apt-get clean && rm -rf /tmp/* /var/lib/apt/lists/*
