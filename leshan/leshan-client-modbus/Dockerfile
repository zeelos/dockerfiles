FROM images.zeelos.io/library/zulu-openjdk-debian:8u172-8.30.0.1-amd64
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_CLIENT_MODBUS_VERSION 0.7-SNAPSHOT

RUN mkdir -p /opt/leshan-client-modbus && \
    curl -k -SL "https://github.com/zeelos/leshan-client-modbus/releases/download/v${LESHAN_CLIENT_MODBUS_VERSION}/leshan-client-modbus-${LESHAN_CLIENT_MODBUS_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-client-modbus/leshan-client-modbus.jar

WORKDIR /opt/leshan-client-modbus

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
