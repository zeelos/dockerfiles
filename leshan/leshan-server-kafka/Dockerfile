FROM zeelos/openjdk:8u212-jre-stretch
LABEL maintainer="dev@zeelos.io" description="Leshan - OMA Lightweight M2M server and client in Java"

ENV LESHAN_KAFKA_SERVER_VERSION 0.8-SNAPSHOT

RUN mkdir -p /opt/leshan-server-kafka && \
    curl -k -SL "https://github.com/zeelos/leshan-server-kafka/releases/download/v${LESHAN_KAFKA_SERVER_VERSION}/leshan-server-kafka-${LESHAN_KAFKA_SERVER_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-server-kafka/leshan-server-kafka.jar

WORKDIR /opt/leshan-server-kafka

COPY entrypoint.sh .

EXPOSE 8080 5683/udp 5684/udp

ENTRYPOINT ["./entrypoint.sh"]
