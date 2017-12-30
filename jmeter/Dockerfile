# inspired from [1] but adopted to use of openjdk and the addition of lwm2m plugin [2] with modifications [3]
#
# [1] https://hub.docker.com/r/hauptmedia/jmeter/
# [2] https://github.com/vears91/lwm2m-jmeter
# [3] https://github.com/vears91/lwm2m-jmeter/compare/master...zeelos:master

FROM java:openjdk-8-jdk
MAINTAINER zeelos.io - https://zeelos.io

ENV DEBIAN_FRONTEND noninteractive

ENV	JMETER_VERSION	3.3
ENV	JMETER_HOME	/opt/jmeter
ENV	JMETER_DOWNLOAD_URL  http://www-us.apache.org/dist//jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz

ENV	JMETER_LESHAN_PLUGIN_VERSION 0.0.1-SNAPSHOT
######    ENV	JMETER_LESHAN_DOWNLOAD_URL https://github.com/zeelos/lwm2m-jmeter/releases/download/v${JMETER_LESHAN_PLUGIN_VERSION}/lwm2m-jmeter-${JMETER_LESHAN_PLUGIN_VERSION}-standalone.jar

#----remove once released----
ENV	JMETER_LESHAN_DOWNLOAD_URL https://www.dropbox.com/s/s9i5hr6mpr6nflf/lwm2m-jmeter-0.0.1-SNAPSHOT-standalone.jar?dl=1

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