ARG IMAGE_TARGET=debian:stretch-slim
ARG BUILD_BASE

FROM ${BUILD_BASE} AS qemu
ARG QEMU=x86_64
ARG QEMU_VERSION=v2.11.0
ADD https://github.com/multiarch/qemu-user-static/releases/download/${QEMU_VERSION}/qemu-${QEMU}-static /qemu-${QEMU}-static
RUN chmod +x /qemu-${QEMU}-static

FROM ${IMAGE_TARGET}
ARG QEMU=x86_64
COPY --from=qemu /qemu-${QEMU}-static /usr/bin/qemu-${QEMU}-static
ARG ARCH=amd64
ARG KAFKA_EXPORTER_ARCH=amd64
ARG VERSION=master
ARG BUILD_DATE
ARG VCS_REF
ARG VCS_URL
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -yq --no-install-recommends dmsetup thin-provisioning-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

COPY --from=qemu /build/kafka_exporter-linux-${KAFKA_EXPORTER_ARCH} /usr/bin/kafka_exporter

EXPOSE 8080
ENTRYPOINT [ "/usr/bin/kafka_exporter" ]
LABEL io.zeelos.kafka_exporter.version=$VERSION \
      io.zeelos.kafka_exporter.name="kafka_exporter" \
      io.zeelos.kafka_exporter.docker.cmd="docker run --kafka.server=kafka-edge:9082 --web.listen-address=:8080 --no-tls.enabled --tls.insecure-skip-tls-verify --publish=8080:8080 --detach=true --name=kafka_exporter zeelos/kafka_exporter" \
      io.zeelos.kafka_exporter.vendor="zeelos.io" \
      io.zeelos.kafka_exporter.architecture=$ARCH \
      io.zeelos.kafka_exporter.vcs-ref=$VCS_REF \
      io.zeelos.kafka_exporter.vcs-url=$VCS_URL \
      io.zeelos.kafka_exporter.build-date=$BUILD_DATE
