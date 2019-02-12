FROM zeelos/zulu-openjdk-debian:8u172-8.30.0.1
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_KAFKA_STREAMS_DEMO_VERSION 0.3-SNAPSHOT

RUN mkdir -p /opt/kafka-streams-leshan && \
    curl -k -SL "https://github.com/zeelos/kafka-streams-leshan/releases/download/v${LESHAN_KAFKA_STREAMS_DEMO_VERSION}/kafka-streams-leshan-${LESHAN_KAFKA_STREAMS_DEMO_VERSION}-standalone.jar" -o /opt/kafka-streams-leshan/kafka-streams-leshan.jar

WORKDIR /opt/kafka-streams-leshan

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
