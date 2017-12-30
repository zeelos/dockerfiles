FROM alpine
MAINTAINER zeelos.io - https://zeelos.io

# Note. We adopted the Dockerfile from the main Landoop Distribution [1] to just include the UI services
#       and rely on a user provided Confluent Kafka distribution.
#
# [1] https://github.com/Landoop/fast-data-dev/blob/master/Dockerfile

# Update, install tooling and some basic setup
RUN apk add --no-cache \
        bash coreutils \
        bash-completion \
        wget curl \
        tar gzip bzip2 \
        sqlite \
        libstdc++ \
        openssl \
    && echo "progress = dot:giga" | tee /etc/wgetrc \
    && mkdir /opt

# Create Landoop configuration directory
RUN mkdir /usr/share/landoop

# Add and Setup Schema-Registry-Ui
#ARG SCHEMA_REGISTRY_UI_URL="https://github.com/zeelos/schema-registry-ui/releases/download/v.0.9.4-zeelos/schema-registry-ui-0.9.4-zeelos.tar.gz"
#----remove once released----
ARG SCHEMA_REGISTRY_UI_URL="https://www.dropbox.com/s/a34b1kitkpphaiu/schema-registry-ui-0.9.4-zeelos.tar.gz?dl=1"
RUN wget "$SCHEMA_REGISTRY_UI_URL" -O /schema-registry-ui.tar.gz \
    && mkdir -p /var/www/schema-registry-ui \
    && tar xzf /schema-registry-ui.tar.gz -C /var/www/schema-registry-ui \
    && rm -f /schema-registry-ui.tar.gz
COPY web/registry-ui-env.js /var/www/schema-registry-ui/env.js

# Add and Setup Kafka-Topics-Ui
ARG KAFKA_TOPICS_UI_URL="https://github.com/Landoop/kafka-topics-ui/releases/download/v0.9.3/kafka-topics-ui-0.9.3.tar.gz"
RUN wget "$KAFKA_TOPICS_UI_URL" -O /kafka-topics-ui.tar.gz \
    && mkdir /var/www/kafka-topics-ui \
    && tar xzf /kafka-topics-ui.tar.gz -C /var/www/kafka-topics-ui \
    && rm -f /kafka-topics-ui.tar.gz
COPY web/topics-ui-env.js /var/www/kafka-topics-ui/env.js

# Add and Setup Kafka-Connect-UI (Note: branch on 'zeelos' for the extra connectors)
#ARG KAFKA_CONNECT_UI_URL="https://github.com/zeelos/kafka-connect-ui/releases/download/v.0.9.4-zeelos-leshan/kafka-connect-ui-0.9.4-zeelos-leshan.tar.gz"
#----remove once released----
ARG KAFKA_CONNECT_UI_URL="https://www.dropbox.com/s/5wqm6j5x70fknlz/kafka-connect-ui-0.9.4-zeelos-leshan.tar.gz?dl=1"

RUN wget "$KAFKA_CONNECT_UI_URL" -O /kafka-connect-ui.tar.gz \
    && mkdir /var/www/kafka-connect-ui \
    && tar xzf /kafka-connect-ui.tar.gz -C /var/www/kafka-connect-ui \
    && rm -f /kafka-connect-ui.tar.gz
COPY web/connect-ui-env.js /var/www/kafka-connect-ui/env.js

# Add fast-data-dev UI
COPY web/index.html web/env.js web/env-webonly.js /var/www/
COPY web/img /var/www/img
RUN ln -s /var/log /var/www/logs

# Add and setup Caddy Server
ARG CADDY_URL=https://github.com/mholt/caddy/releases/download/v0.9.5/caddy_linux_amd64.tar.gz
RUN wget "$CADDY_URL" -O /caddy.tgz \
    && mkdir -p /opt/caddy \
    && tar xzf /caddy.tgz -C /opt/caddy \
    && mv /opt/caddy/caddy_linux_amd64 /opt/caddy/caddy \
    && rm -f /caddy.tgz
ADD Caddyfile /usr/share/landoop

EXPOSE 3030

ENTRYPOINT ["/opt/caddy/caddy","-conf","/usr/share/landoop/Caddyfile"]

