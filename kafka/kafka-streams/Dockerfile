FROM images.zeelos.io/library/openjdk:8u212-jre-stretch-amd64
LABEL maintainer="dev@zeelos.io" description="kstreams-demo examples demonstrating KStream technology"

ENV LESHAN_KAFKA_STREAMS_DEMO_VERSION 0.4-SNAPSHOT

RUN mkdir -p /opt/kafka-streams-leshan && \
    curl -k -SL "https://github.com/zeelos/kafka-streams-leshan/releases/download/v${LESHAN_KAFKA_STREAMS_DEMO_VERSION}/kafka-streams-leshan-${LESHAN_KAFKA_STREAMS_DEMO_VERSION}-standalone.jar" -o /opt/kafka-streams-leshan/kafka-streams-leshan.jar

WORKDIR /opt/kafka-streams-leshan

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
