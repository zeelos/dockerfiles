FROM zeelos/cp-kafka-connect:4.1.1-openj9
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_DRIVER_VERSION 0.1-SNAPSHOT
ENV TRANSFORMS_VERSION 0.1-SNAPSHOT

ENV STREAM_REACTOR_VERSION 1.1.0
ENV INFLUXDB_DRIVER_VERSION 1.1.0

# add Leshan Asset, InfluxDB and tranforms connectors
RUN mkdir -p /opt/connectors && \
    curl -k -SL "https://github.com/zeelos/kafka-connect-leshan-asset/releases/download/v${LESHAN_DRIVER_VERSION}/kafka-connect-leshan-asset-${LESHAN_DRIVER_VERSION}-standalone.jar" -o /opt/connectors/leshan-asset.jar && \
    curl -k -SL "https://github.com/datamountaineer/stream-reactor/releases/download/${STREAM_REACTOR_VERSION}/kafka-connect-influxdb-${STREAM_REACTOR_VERSION}-${INFLUXDB_DRIVER_VERSION}-all.tar.gz" | tar -xzf - -C /opt/connectors/ && \
    curl -k -SL "https://github.com/zeelos/kafka-connect-transforms/releases/download/v${TRANSFORMS_VERSION}/transforms-${TRANSFORMS_VERSION}.jar" -o /opt/connectors/transforms.jar 
