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
ARG CADVISOR_ARCH=amd64
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

COPY --from=qemu /build/cadvisor-linux-${CADVISOR_ARCH} /usr/bin/cadvisor

EXPOSE 8080
ENTRYPOINT ["/usr/bin/cadvisor", "-logtostderr"]
LABEL io.zeelos.cadvisor.version=$VERSION \
      io.zeelos.cadvisor.name="cAdvisor" \
      io.zeelos.cadvisor.docker.cmd="docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --volume=/dev/disk/:/dev/disk:ro --publish=8080:8080 --detach=true --name=cadvisor zeelos/cadvisor" \
      io.zeelos.cadvisor.vendor="zeelos.io" \
      io.zeelos.cadvisor.architecture=$ARCH \
      io.zeelos.cadvisor.vcs-ref=$VCS_REF \
      io.zeelos.cadvisor.vcs-url=$VCS_URL \
      io.zeelos.cadvisor.build-date=$BUILD_DATE
