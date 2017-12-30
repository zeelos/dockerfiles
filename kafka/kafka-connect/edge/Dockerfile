FROM zeelos/kafka-connect-standalone:0.1-SNAPSHOT
MAINTAINER zeelos.io - https://zeelos.io

# add Replicator connector
RUN apt-get -qq update && \
    apt-get install -y \
        confluent-kafka-connect-replicator && \
     apt-get clean && rm -rf /tmp/* /var/lib/apt/lists/*

# backport PR-confluentinc#664 avro enum fix to v4.0.0, see -> 'https://github.com/zeelos/schema-registry/
ADD kafka-connect-avro-converter-4.0.0-patched.tar.gz /usr/share/java/kafka-serde-tools/