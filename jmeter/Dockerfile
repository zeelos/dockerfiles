# inspired from [1] but adopted to use of openjdk and the addition of lwm2m plugin [2] with modifications [3]
#
# [1] https://hub.docker.com/r/hauptmedia/jmeter/
# [2] https://github.com/vears91/lwm2m-jmeter
# [3] https://github.com/vears91/lwm2m-jmeter/compare/master...zeelos:master

FROM images.zeelos.io/library/openjdk:8u212-jre-stretch-amd64
LABEL maintainer="dev@zeelos.io" description="JMeter - A load testing tool for analyzing and measuring the performance of a variety of services"

ENV DEBIAN_FRONTEND noninteractive

ENV	JMETER_VERSION	3.3
ENV	JMETER_HOME	/opt/jmeter
ENV	JMETER_DOWNLOAD_URL https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz

ENV	JMETER_LESHAN_PLUGIN_VERSION 0.0.1-SNAPSHOT
ENV	JMETER_LESHAN_DOWNLOAD_URL https://github.com/zeelos/lwm2m-jmeter/releases/download/v${JMETER_LESHAN_PLUGIN_VERSION}/lwm2m-jmeter-${JMETER_LESHAN_PLUGIN_VERSION}-standalone.jar

# install needed debian packages & clean up
RUN	apt-get update && \
	apt-get install -y --no-install-recommends curl tar ca-certificates unzip && \
	apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

# download and extract jmeter
RUN	mkdir -p ${JMETER_HOME} && \
	mkdir -p ${JMETER_HOME}/tests && \
	curl -L ${JMETER_DOWNLOAD_URL} | tar -xz --strip=1 -C ${JMETER_HOME} && \
	curl -L ${JMETER_LESHAN_DOWNLOAD_URL} -o ${JMETER_HOME}/lib/ext/lwm2m-jmeter.jar

ADD leshan.jmx ${JMETER_HOME}/tests

WORKDIR ${JMETER_HOME}

ENTRYPOINT ["bin/jmeter"]
