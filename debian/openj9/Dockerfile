FROM debian:stretch

# Eclipse OpenJ9
ENV OPENJ9_VERSION="jdk8u162-b12_openj9-0.8.0"

# This affects how strings in Java class files are interpreted.  We want UTF-8 and this is the only locale in the base image that supports it
ENV LANG="C.UTF-8"

RUN echo "===> Updating debian ....." \
    && apt-get -qq update \
    \
    && echo "===> Installing curl wget netcat...." \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
                apt-transport-https \
                gnupg \
                curl \
                wget \
                netcat \
   && echo "===> Installing Eclipse OpenJ9 ${OPENJ9_VERSION}" \
   && mkdir -p /usr/lib/jvm \
   && wget -qO- https://github.com/AdoptOpenJDK/openjdk8-openj9-releases/releases/download/${OPENJ9_VERSION}/OpenJDK8-OPENJ9_x64_Linux_${OPENJ9_VERSION}.tar.gz | tar xvz -C /usr/lib/jvm \
   && update-alternatives --install /usr/bin/java java /usr/lib/jvm/${OPENJ9_VERSION}/bin/java 100