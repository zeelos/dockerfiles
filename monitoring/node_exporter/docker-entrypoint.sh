#!/bin/sh -e

NODE_NAME="${NODE_NAME:-$(cat /etc/nodename)}"
echo "node_meta{node_id=\"$NODE_ID\", container_label_com_docker_swarm_node_id=\"$NODE_ID\", node_name=\"$NODE_NAME\"} 1" > /etc/node_exporter/node-meta.prom

set -- /usr/bin/node_exporter "$@"

exec "$@"
