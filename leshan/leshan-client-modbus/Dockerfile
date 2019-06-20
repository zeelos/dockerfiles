FROM zeelos/openjdk:8u212-jre-stretch-amd64
LABEL maintainer="dev@zeelos.io" description="Leshan - OMA Lightweight M2M server and client in Java"

ENV LESHAN_CLIENT_MODBUS_VERSION 0.7-SNAPSHOT

RUN mkdir -p /opt/leshan-client-modbus && \
    curl -k -SL "https://github.com/zeelos/leshan-client-modbus/releases/download/v${LESHAN_CLIENT_MODBUS_VERSION}/leshan-client-modbus-${LESHAN_CLIENT_MODBUS_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-client-modbus/leshan-client-modbus.jar

WORKDIR /opt/leshan-client-modbus

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
