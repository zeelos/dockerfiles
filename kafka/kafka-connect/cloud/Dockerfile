FROM zeelos/cp-kafka-connect:5.2.2
LABEL maintainer="dev@zeelos.io" description="Kafka-Connect - docker image that includes leshan and influxdb connectors"

ENV LESHAN_DRIVER_VERSION 0.5-SNAPSHOT
ENV TRANSFORMS_VERSION 0.5-SNAPSHOT

ENV STREAM_REACTOR_VERSION 1.2.1
ENV INFLUXDB_DRIVER_VERSION 2.1.0

# add Leshan Asset, InfluxDB and tranforms connectors
RUN mkdir -p /opt/connectors && \
    curl -k -SL "https://github.com/zeelos/kafka-connect-leshan-asset/releases/download/v${LESHAN_DRIVER_VERSION}/kafka-connect-leshan-asset-${LESHAN_DRIVER_VERSION}-standalone.jar" -o /opt/connectors/leshan-asset.jar && \
    curl -k -SL "https://github.com/datamountaineer/stream-reactor/releases/download/${STREAM_REACTOR_VERSION}/kafka-connect-influxdb-${STREAM_REACTOR_VERSION}-${INFLUXDB_DRIVER_VERSION}-all.tar.gz" | tar -xzf - -C /opt/connectors/ && \
    curl -k -SL "https://github.com/zeelos/kafka-connect-transforms/releases/download/v${TRANSFORMS_VERSION}/transforms-${TRANSFORMS_VERSION}.jar" -o /opt/connectors/transforms.jar 
