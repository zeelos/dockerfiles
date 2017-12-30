var runningServices = [
  {
    "name" : "Confluent OSS v4.0.0 - Kafka v1.0.0",
    "description" : "2× Broker, 2× Schema Registry, 2× Connect Distributed Worker, 2× REST Proxy, 2× Zookeeper, 2x MirrorMaker"
  },
  {
    "name" : "Landoop Schema Registry UI v0.9.4",
    "description" : "Create, view, search, edit, validate, evolve & configure Avro schemas"
  },
  {
    "name" : "Landoop Kafka Topics UI v0.9.3",
    "description" : "Browse and search topics, inspect data, metadata and configuration"
  },
  {
    "name" : "Landoop Kafka Connect UI v0.9.4",
    "description" : "View, create, update and manage connectors"
  }
];

var disabled = [
];

var servicesInfo = [
  {
    "name" : "ZooKeeper [cloud]",
    "port" : "2181",
    "jmx"  : "9585 : JMX",
    "url"  : "zookeeper-cloud"
  },
  {
    "name" : "ZooKeeper [edge]",
    "port" : "2171",
    "jmx"  : "9575 : JMX",
    "url"  : "zookeeper-edge"
  },
  {
    "name" : "Kafka Broker [cloud]",
    "port" : "9092",
    "jmx"  : "9581 : JMX",
    "url"  : "kafka-cloud"
  },
  {
    "name" : "Kafka Broker [edge]",
    "port" : "9082",
    "jmx"  : "9571 : JMX",
    "url"  : "kafka-edge"
  },
  {
    "name" : "Schema Registry [cloud]",
    "port" : "8081",
    "jmx"  : "9582 : JMX",
    "url"  : "http://schema-registry-cloud"
  },
  {
    "name" : "Schema Registry [edge]",
    "port" : "8071",
    "jmx"  : "9572 : JMX",
    "url"  : "http://schema-registry-edge"
  },
  {
    "name" : "Kafka Connect[cloud]",
    "port" : "8083",
    "jmx"  : "9584 : JMX",
    "url"  : "http://kafka-connect-cloud"
  },
  {
    "name" : "Kafka REST Proxy [cloud]",
    "port" : "8082",
    "jmx"  : "9583 : JMX",
    "url"  : "http://kafka-rest-cloud"
  },
  {
    "name" : "Kafka REST Proxy [edge]",
    "port" : "8072",
    "jmx"  : "9573 : JMX",
    "url"  : "http://kafka-rest-cloud"
  },
  {
    "name" : "Leshan Server",
    "port" : "8080",
    "jmx"  : "9590 : JMX",
    "url"  : "http://leshan-server-kafka"
  },
  {
    "name" : "Web Server",
    "port" : "3030",
    "jmx"  : "",
    "url"  : "http://landoop-ui"
  },
  {
    "name" : "Kafka MirrorMaker [cloud]",
    "port" : " - ",
    "jmx"  : "9574 : JMX",
    "url"  : "-"
  },
  {
    "name" : "Kafka MirrorMaker [edge]",
    "port" : " - ",
    "jmx"  : "9564 : JMX",
    "url"  : "-"
  }
];

var exposedDirectories = [
  {
    "name" : "running services log files",
    "url" : "/logs",
    "enabled" : "1"
  },
  {
    "name" : "certificates (truststore and client keystore)",
    "url" : "/certs",
    "enabled" : "ssl_browse"
  }
];
