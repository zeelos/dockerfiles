FROM zeelos/eclipse-openj9-debian:jdk8u162-b12_openj9-0.8.0
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_CLIENT_DEMO_VERSION 0.1-SNAPSHOT

RUN mkdir -p /opt/leshan-client-demo && \
    curl -k -SL "https://github.com/zeelos/leshan-client-demo/releases/download/v${LESHAN_CLIENT_DEMO_VERSION}/leshan-client-demo-${LESHAN_CLIENT_DEMO_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-client-demo/leshan-client-demo.jar

WORKDIR /opt/leshan-client-demo

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
