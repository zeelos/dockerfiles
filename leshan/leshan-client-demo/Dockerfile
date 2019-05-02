FROM images.zeelos.io/library/zulu-openjdk-debian:8u172-8.30.0.1-amd64
MAINTAINER zeelos.io - https://zeelos.io

ENV LESHAN_CLIENT_DEMO_VERSION 0.7-SNAPSHOT

RUN mkdir -p /opt/leshan-client-demo && \
    curl -k -SL "https://github.com/zeelos/leshan-client-demo/releases/download/v${LESHAN_CLIENT_DEMO_VERSION}/leshan-client-demo-${LESHAN_CLIENT_DEMO_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-client-demo/leshan-client-demo.jar

WORKDIR /opt/leshan-client-demo

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
