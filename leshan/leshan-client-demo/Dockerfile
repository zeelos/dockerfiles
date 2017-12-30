FROM java:openjdk-8-jdk
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_CLIENT_DEMO_VERSION 0.1-SNAPSHOT

######RUN mkdir -p /opt/leshan-client-demo && \
######curl -k -SL -o /opt/leshan-client-demo/leshan-client-demo.jar https://github.com/zeelos/leshan-client-demo/releases/download/v${LESHAN_CLIENT_DEMO_VERSION}/leshan-server-kafka-${LESHAN_CLIENT_DEMO_VERSION}-jar-with-dependencies.jar

#----remove once released----
RUN mkdir -p /opt/leshan-client-demo && \
    curl -k -SL -o /opt/leshan-client-demo/leshan-client-demo.jar https://www.dropbox.com/s/g3yn75ijaresawi/leshan-client-demo-0.1-SNAPSHOT-jar-with-dependencies.jar?dl=1

WORKDIR /opt/leshan-client-demo

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
