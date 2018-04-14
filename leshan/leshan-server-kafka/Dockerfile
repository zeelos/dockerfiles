FROM java:openjdk-8-jdk
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_KAFKA_SERVER_VERSION 0.2-SNAPSHOT

######RUN mkdir -p /opt/leshan-server-kafka && \
######    curl -k -SL -o /opt/leshan-server-kafka/leshan-server-kafka.jar https://github.com/cvasilak/leshan-server-kafka/releases/download/v${LESHAN_KAFKA_SERVER_VERSION}/leshan-server-kafka-${LESHAN_KAFKA_SERVER_VERSION}-jar-with-dependencies.jar && \
######	touch /opt/leshan-server-kafka/Californium.properties

#----remove once released----
RUN mkdir -p /opt/leshan-server-kafka && \
	curl -k -SL -o /opt/leshan-server-kafka/leshan-server-kafka.jar https://www.dropbox.com/s/hjax918dwfvgtmr/leshan-server-kafka-0.2-SNAPSHOT-jar-with-dependencies.jar?dl=1 && \
	touch /opt/leshan-server-kafka/Californium.properties

WORKDIR /opt/leshan-server-kafka

COPY entrypoint.sh .

EXPOSE 8080 5683/udp 5684/udp

ENTRYPOINT ["./entrypoint.sh"]
