FROM java:openjdk-8-jdk
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_KAFKA_STREAMS_DEMO_VERSION 0.1-SNAPSHOT

######    RUN mkdir -p /opt/kafka-streams-leshan && \
######    curl -k -SL -o /opt/kafka-streams-leshan/kafka-streams-leshan.jar https://github.com/zeelos/kafka-streams-leshan/releases/download/v${LESHAN_KAFKA_STREAMS_DEMO_VERSION}/kafka-streams-leshan-${LESHAN_KAFKA_STREAMS_DEMO_VERSION}-standalone.jar

#----remove once released----
RUN mkdir -p /opt/kafka-streams-leshan && \
    curl -k -SL -o /opt/kafka-streams-leshan/kafka-streams-leshan.jar https://www.dropbox.com/s/57wypfs1hkfuseu/kafka-streams-leshan-0.1-SNAPSHOT-standalone.jar?dl=1

WORKDIR /opt/kafka-streams-leshan

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
