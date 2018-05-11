FROM zeelos/zulu-openjdk-debian:8u162-8.27.0.91-arm32v7
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_KAFKA_SERVER_VERSION 0.1-SNAPSHOT

RUN mkdir -p /opt/leshan-server-kafka && \
    curl -k -SL "https://github.com/zeelos/leshan-server-kafka/releases/download/v${LESHAN_KAFKA_SERVER_VERSION}/leshan-server-kafka-${LESHAN_KAFKA_SERVER_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-server-kafka/leshan-server-kafka.jar

WORKDIR /opt/leshan-server-kafka

COPY entrypoint.sh .

EXPOSE 8080 5683/udp 5684/udp

ENTRYPOINT ["./entrypoint.sh"]
