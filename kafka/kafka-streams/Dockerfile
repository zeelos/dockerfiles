FROM zeelos/eclipse-openj9-debian:jdk8u162-b12_openj9-0.8.0
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_KAFKA_STREAMS_DEMO_VERSION 0.1-SNAPSHOT

RUN mkdir -p /opt/kafka-streams-leshan && \
    curl -k -SL "https://github.com/zeelos/kafka-streams-leshan/releases/download/v${LESHAN_KAFKA_STREAMS_DEMO_VERSION}/kafka-streams-leshan-${LESHAN_KAFKA_STREAMS_DEMO_VERSION}-standalone.jar" -o /opt/kafka-streams-leshan/kafka-streams-leshan.jar

WORKDIR /opt/kafka-streams-leshan

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
