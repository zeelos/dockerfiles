ARG IMAGE_TARGET=debian:stretch-slim

FROM alpine AS qemu
ARG QEMU=x86_64
ARG QEMU_VERSION=v2.11.0
ADD https://github.com/multiarch/qemu-user-static/releases/download/${QEMU_VERSION}/qemu-${QEMU}-static /qemu-${QEMU}-static
RUN chmod +x /qemu-${QEMU}-static

FROM ${IMAGE_TARGET}
ARG QEMU=x86_64
COPY --from=qemu /qemu-${QEMU}-static /usr/bin/qemu-${QEMU}-static
ARG ARCH=amd64
ARG DOCKER_EXPORTER_ARCH=amd64
ARG VERSION=master
ARG BUILD_DATE
ARG VCS_REF
ARG VCS_URL
ENV DEBIAN_FRONTEND noninteractive

# used by socat (default values)
ENV IN 172.18.0.1:4999
ENV OUT 4999

RUN apt-get update && \
    apt-get install -yq --no-install-recommends dmsetup thin-provisioning-tools socat && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

ENTRYPOINT socat -d -d TCP-L:$OUT,fork TCP:$IN

LABEL io.zeelos.docker_exporter.version=$VERSION \
      io.zeelos.docker_exporter.name="docker_exporter" \
      io.zeelos.docker_exporter.docker.cmd="docker run -e IN=172.18.0.1:4999 -e OUT=4999 --publish=4999:4999 --detach=true --name=docker_exporter zeelos/docker_exporter" \
      io.zeelos.docker_exporter.vendor="zeelos.io" \
      io.zeelos.docker_exporter.architecture=$ARCH \
      io.zeelos.docker_exporter.build-date=$BUILD_DATE