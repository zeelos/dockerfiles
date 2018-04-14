FROM confluentinc/cp-kafka-connect:4.0.0
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_DRIVER_VERSION 0.2-SNAPSHOT
ENV TRANSFORMS_CONNECT_TRANSFORM 0.1-SNAPSHOT

ENV STREAM_REACTOR_VERSION 1.0.0
ENV INFLUXDB_DRIVER_VERSION 1.0.0

# add Leshan Asset and InfluxDB connectors
######    mkdir -p /opt/connectors && \
######    curl -k -SL "https://github.com/zeelos/kafka-connect-leshan-asset/releases/download/v${LESHAN_DRIVER_VERSION}/kafka-connect-leshan-asset-${LESHAN_DRIVER_VERSION}-standalone.jar" -o /opt/connectors/leshan-asset.jar && \
######    curl -k -SL "https://github.com/datamountaineer/stream-reactor/releases/download/${STREAM_REACTOR_VERSION}/kafka-connect-influxdb-${STREAM_REACTOR_VERSION}-${INFLUXDB_DRIVER_VERSION}-all.tar.gz" \
######        | tar -xzf - -C /opt/connectors/


#----remove once released----
RUN mkdir -p /opt/connectors && \
    curl -k -SL "https://www.dropbox.com/s/91aq8os1wctufkz/kafka-connect-leshan-asset-0.2-SNAPSHOT-standalone.jar?dl=1" -o /opt/connectors/leshan-asset.jar && \
    curl -k -SL "https://github.com/datamountaineer/stream-reactor/releases/download/${STREAM_REACTOR_VERSION}/kafka-connect-influxdb-${STREAM_REACTOR_VERSION}-${INFLUXDB_DRIVER_VERSION}-all.tar.gz" \
        | tar -xzf - -C /opt/connectors/

# add useful Kafka transformations
######ADD https://github.com/zeelos/kafka-connect-transforms/releases/download/v${TRANSFORMS_CONNECT_TRANSFORM}/transforms-${TRANSFORMS_CONNECT_TRANSFORM}.jar /opt/connectors/ 

#----remove once released----
ADD https://www.dropbox.com/s/enjtay699cid4um/transforms-0.1-SNAPSHOT.jar?dl=1 /opt/connectors/

# backport PR-confluentinc#664 avro enum fix to v4.0.0, see -> 'https://github.com/zeelos/schema-registry/commit/aa3932a5065c17b24b589ac0961fe3c8bb1e01ce'
ADD kafka-connect-avro-converter-4.0.0-patched.tar.gz /usr/share/java/kafka-connect-hdfs/
ADD kafka-connect-avro-converter-4.0.0-patched.tar.gz /usr/share/java/kafka-connect-storage-common/
ADD kafka-connect-avro-converter-4.0.0-patched.tar.gz /usr/share/java/kafka-serde-tools/
