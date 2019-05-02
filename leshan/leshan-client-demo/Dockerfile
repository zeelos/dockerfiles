FROM images.zeelos.io/library/openjdk:8u212-jre-stretch-arm64v8
LABEL maintainer="dev@zeelos.io" description="Leshan - OMA Lightweight M2M server and client in Java"

ENV LESHAN_CLIENT_DEMO_VERSION 0.7-SNAPSHOT

RUN mkdir -p /opt/leshan-client-demo && \
    curl -k -SL "https://github.com/zeelos/leshan-client-demo/releases/download/v${LESHAN_CLIENT_DEMO_VERSION}/leshan-client-demo-${LESHAN_CLIENT_DEMO_VERSION}-jar-with-dependencies.jar" -o /opt/leshan-client-demo/leshan-client-demo.jar

WORKDIR /opt/leshan-client-demo

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
