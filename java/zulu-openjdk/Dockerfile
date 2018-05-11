FROM arm32v7/debian:stretch

# Zulu
ENV ZULU_OPENJDK_VERSION="ezdk-1.8.0_162-8.27.0.91-eval-linux_aarch32hf"

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
	&& echo "===> Installing Zulu OpenJDK ${ZULU_OPENJDK_VERSION}" \
    && mkdir /usr/lib/jvm \
    && wget -qO- http://cdn.azul.com/zulu-embedded/bin/${ZULU_OPENJDK_VERSION}.tar.gz | tar xvz -C /usr/lib/jvm \
    && update-alternatives --install /usr/bin/java java /usr/lib/jvm/${ZULU_OPENJDK_VERSION}/bin/java 100 \
    && update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/${ZULU_OPENJDK_VERSION}/bin/javac 100 \
    && update-alternatives --install /usr/bin/jar jar /usr/lib/jvm/${ZULU_OPENJDK_VERSION}/bin/jar 100