FROM java:openjdk-8-jdk
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_CLIENT_MODBUS_VERSION 0.2-SNAPSHOT

######RUN mkdir -p /opt/leshan-client-modbus && \
######curl -k -SL -o /opt/leshan-client-modbus/leshan-client-modbus.jar https://github.com/zeelos/leshan-client-modbus/releases/download/v${LESHAN_CLIENT_MODBUS_VERSION}/leshan-client-modbus-${LESHAN_CLIENT_MODBUS_VERSION}-jar-with-dependencies.jar

#----remove once released----
RUN mkdir -p /opt/leshan-client-modbus && \
    curl -k -SL -o /opt/leshan-client-modbus/leshan-client-modbus.jar https://www.dropbox.com/s/ox9jp3ij389rl6n/leshan-client-modbus-0.2-SNAPSHOT-jar-with-dependencies.jar?dl=1

WORKDIR /opt/leshan-client-modbus

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
