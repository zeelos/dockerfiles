var runningServices = [
  {
    "name" : "Landoop Schema Registry UI v0.9.3",
    "description" : "Create, view, search, edit, validate, evolve & configure Avro schemas"
  },
  {
    "name" : "Landoop Kafka Topics UI v0.9.3",
    "description" : "Browse and search topics, inspect data, metadata and configuration"
  },
  {
    "name" : "Landoop Kafka Connect UI v0.9.3",
    "description" : "View, create, update and manage connectors"
  }
];

var disabled = [
];

var servicesInfo = [
  {
    "name" : "Kafka Broker [cloud]",
    "port" : "9092",
    "jmx"  : "9581 : JMX",
    "url"  : "kafka-cloud"
  },
  {
    "name" : "Kafka Broker [edge]",
    "port" : "9082",
    "jmx"  : "95711 : JMX",
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
    "name" : "Kafka REST Proxy [cloud]",
    "port" : "8082",
    "jmx"  : "9583 : JMX",
    "url"  : "http://kafka-rest-cloud"
  },
  {
    "name" : "Kafka Connect [cloud][worker-1]",
    "port" : "8083",
    "jmx"  : "9584 : JMX",
    "url"  : "http://kafka-connect-cloud-worker-1"
  },
  {
    "name" : "Kafka Connect [cloud][worker-2]",
    "port" : "8183",
    "jmx"  : "9684 : JMX",
    "url"  : "http://kafka-connect-cloud-worker-2"
  },
  {
    "name" : "Kafka Connect [edge]",
    "port" : "8073",
    "jmx"  : "9574 : JMX",
    "url"  : "http://kafka-connect-edge"
  },
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
    "name" : "Web Server",
    "port" : "3030",
    "jmx"  : "",
    "url"  : "http://landoop-ui"
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
