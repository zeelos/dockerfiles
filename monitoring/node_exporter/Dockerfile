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
ARG NODE_EXPORTER_ARCH=amd64
ARG VERSION=master
ARG BUILD_DATE
ARG VCS_REF
ARG VCS_URL
ENV DEBIAN_FRONTEND noninteractive

ENV NODE_ID=none

RUN apt-get update && \
    apt-get install -yq --no-install-recommends dmsetup thin-provisioning-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf

COPY --from=qemu /build/node_exporter-linux-${NODE_EXPORTER_ARCH} /usr/bin/node_exporter

COPY ./docker-entrypoint.sh /usr/bin/

RUN mkdir /etc/node_exporter

EXPOSE 8080
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
LABEL io.zeelos.node_exporter.version=$VERSION \
      io.zeelos.node_exporter.name="node_exporter" \
      io.zeelos.node_exporter.docker.cmd="docker run -e NODE_ID=my_node_id -e NODE_NAME=my_node_name --volume=/proc:/host/proc:ro --volume=/sys:/host/sys:ro --volume=/:/rootfs:ro --collector.filesystem.ignored-mount-points="^(/rootfs|/host|)/(sys|proc|dev|host|etc)($$|/)" --collector.filesystem.ignored-fs-types="^(sys|proc|auto|cgroup|devpts|ns|au|fuse\.lxc|mqueue)(fs|)$$" --collector.textfile.directory=/etc/node_exporter/ --publish=9100:9100 --detach=true --name=node_exporter zeelos/node_exporter" \
      io.zeelos.node_exporter.vendor="zeelos.io" \
      io.zeelos.node_exporter.architecture=$ARCH \
      io.zeelos.node_exporter.vcs-ref=$VCS_REF \
      io.zeelos.node_exporter.vcs-url=$VCS_URL \
      io.zeelos.node_exporter.build-date=$BUILD_DATE