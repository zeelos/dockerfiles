## Architecure Overview

![Zeelos Architecture Diagram](https://image.ibb.co/dF5SNb/Zeelos_Architecture_Diagram.png)

## Setup

1. Create `zeelos-cloud` vm machine:

		docker-machine create --driver virtualbox --virtualbox-memory 8192 zeelos-cloud
		docker-machine ssh zeelos-cloud "docker swarm init --advertise-addr <zeelos-cloud-vm ip>"


2. Create `zeelos-server1` machine to simulate an edge gateway and then join the swarm:

		docker-machine create --driver virtualbox --virtualbox-memory 4096 zeelos-server1
		docker-machine ssh zeelos-server1 "docker swarm join --token <token> <zeelos-cloud-vm ip>:<port>"

	>  NOTE: Use `eval` to switch between `zeelos-cloud` and `zeelos-server1` edge when stated in the document: 

		eval $(docker-machine env zeelos-cloud)
		eval $(docker-machine env zeelos-server1)


3. Assign labels to nodes so the services would be propogated to the correct node upon deployment:

		docker-machine ssh zeelos-cloud "docker node update --label-add type=cloud zeelos-cloud"
		docker-machine ssh zeelos-cloud "docker node update --label-add type=server1 zeelos-server1"


4. Create overlay networks for cloud and edge gateway on `zeelos-cloud`:

		docker network create --driver overlay cloudnet
		docker network create --driver overlay edgenet_server1


5. Copy both cloud and edge `docker-compose.yml` files to swarm master and deploy:
		
		docker-machine scp docker-compose-cloud.yml zeelos-cloud:~
		docker-machine ssh zeelos-cloud "docker stack deploy -c docker-compose-cloud.yml zeelos-cloud"


		docker-machine scp docker-compose-edge.yml zeelos-cloud:~
		docker-machine ssh zeelos-cloud "docker stack deploy -c docker-compose-edge.yml zeelos-server1"


6. Create a request topic on `zeelos-cloud`. Clients will use that topic to send requests to the edge gateway (topic will be [replicated](https://docs.confluent.io/current/connect/connect-replicator/docs/connect_replicator.html) automatically on the `zeelos-server1` edge) :

		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_management_req --zookeeper zookeeper-cloud:2181 --partitions 1 --replication-factor 1


7. Create topics on `zeelos-server1` edge gateway. [Leshan Server Kafka](https://github.com/cvasilak/leshan-server-kafka) will use those topics to propagate all of it's messages (topics would then be [replicated](https://docs.confluent.io/current/connect/connect-replicator/docs/connect_replicator.html) automatically back to the cloud) :

		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_observation --zookeeper zookeeper-edge:2171 --partitions 4 --replication-factor 1 && \
		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_registration_new --zookeeper zookeeper-edge:2171 --partitions 4 --replication-factor 1 && \
		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_registration_up --zookeeper zookeeper-edge:2171 --partitions 4 --replication-factor 1 && \
		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_registration_del --zookeeper zookeeper-edge:2171 --partitions 4 --replication-factor 1 && \
		docker exec -it <kafka-container-id> kafka-topics --create --topic server1_management_rep --zookeeper zookeeper-edge:2171 --partitions 4 --replication-factor 1


8. Deploy a series of connectors on `zeelos-cloud` for storing sensor time-series data on [InfluxDB](https://www.influxdata.com/time-series-platform/influxdb/) and visualizing the Leshan LWM2M model on a [TinkerPop3](http://tinkerpop.apache.org) enabled graph database (we used [OrientDB](http://orientdb.com) in our [custom developed connector](https://github.com/cvasilak/kafka-connect-leshan-asset)).

    Since data are flowing into Kafka [any other connector](https://www.confluent.io/product/connectors/) can be used.
 
    For deploying the connectors we recommend the excellent [kafkacli tools](https://github.com/fhussonnois/kafkacli):

		export KAFKA_CONNECT_HOST=<zeelos-cloud-vm ip>
		export KAFKA_CONNECT_PORT=8083

		cd ./configs && \
		kafka-connect-cli create -pretty -config.json kafka-connect-replicator/replicator-server1-gateway-to-cloud.json && \
		kafka-connect-cli create -pretty -config.json kafka-connect-leshan-asset/connect-leshan-sink-asset.json && \
		kafka-connect-cli create -pretty -config.json kafka-connect-influxdb/connect-influxdb-sink.json


9. Start a virtual sensor that will attach on the Leshan server running at the edge:

		docker service create --name leshan-client-demo-1 --network edgenet_server1 --constraint "node.labels.type == server1" cvasilak/leshan-client-demo:0.1-SNAPSHOT -u leshan-server-kafka

		
10. Visit [Leshan Server web interface](http://192.168.99.100:8080) and click on the sensor to get to the information page. Once there, start an '*Observation*' on the two simulated sensor instance resources on the '*Temperature*' object:

	![Leshan](https://image.ibb.co/iJVi25/leshan.png)


11. Visit [Grafana web interface](http://192.168.99.100:3000) and notice that received sensor values are correctly propagated from the edge to the cloud (using [kafka-connect replicator](https://docs.confluent.io/current/connect/connect-replicator/docs/connect_replicator.html)) and from there to the database by the excellent [InfluxDB Kafka connector](http://docs.datamountaineer.com/en/latest/influx.html) from [DataMountaineer](https://datamountaineer.com):

	![Grafana](https://image.ibb.co/ibai25/grafana.png)


12. Start a [jmeter-leshan demo](https://github.com/cvasilak/lwm2m-jmeter) to connect multiple virtual sensors and to perform any benchmarking tests (adjust command line parameters accordingly)

		docker service create --name jmeter-leshan --network edgenet_server1 --constraint "node.labels.type == server1" cvasilak/jmeter-leshan:0.0.1-SNAPSHOT -n -t /opt/jmeter/tests/leshan.jmx -JserverHost=leshan-server-kafka -JserverPort=5683 -JrestPort=8080 -Jthreads=10 -JthreadsRampUp=3 -JthreadsLoopCount=1000 -JthreadDelayObserveSend=1000


13. Visit [OrientDB web interface](http://192.168.99.100:2480) to get a visual representation of all the sensors currently connected. Similar to Grafana, the OrientDB database is filled by another [Kafka connector](https://github.com/cvasilak/kafka-connect-leshan-asset) from the incoming data from the edge.

	Once login, click the 'Graph' tab and on the graph editor do a simple query like '`select from Servers`' to get the current active Leshan server. From there you can start exploring by selecting the server and clicking the expand button:

	![OrientDB](https://image.ibb.co/cCM15Q/orientdb.png)


14. We can easily scale the Kafka Connect cluster to two instances to cope with the increased "simulated" demand. All deployed connectors have been configured with `"tasks.max": "2"` so one of the tasks would be propagated to the second instance:

		docker service scale zeelos-cloud_kafka-connect-cloud=2
		
	For example, notice in the following screenshot, that tasks of the InfluxDBSink and LeshanAssetSink connectors are deployed in the first instance(top) and on the second one (bottom) and both being kept busy:
	
	![Kafka Connect Scale](https://image.ibb.co/jiQfQw/kafka_connect_scale.jpg)


15. Start some [Kafka Streams Analytics](https://github.com/cvasilak/kafka-streams-leshan) that will run at the edge. [The first analytic](https://github.com/cvasilak/kafka-streams-leshan/blob/master/src/main/java/org/cvasilak/leshan/kafka/streams/SimpleAnalyticsStreamsApp.java#L83-L105) aggregates sensor readings by '`endpoint id`' and by '`endpoint id`' and '`path`' per minute and outputs the result in the console. Use `docker logs -f <container_id>` to watch it's output:

		docker service create --name kstreams-aggregate --network edgenet_server1 --constraint "node.labels.type == server1" cvasilak/kafka-streams-leshan:0.1-SNAPSHOT org.cvasilak.leshan.kafka.streams.SimpleAnalyticsStreamsApp kafka-edge:9082 http://schema-registry-edge:8071

	[The second analytic](https://github.com/cvasilak/kafka-streams-leshan/blob/master/src/main/java/org/cvasilak/leshan/kafka/streams/TemperatureStreamsApp.java#L99-L121) calculates the maximum temperature of the incoming observations grouped by '`endpoint id`' and '`path`' over a period of 30 secs and outputs the result in the `server1_observation_maxper30sec` topic:
	
		docker service create --name kstreams-temperature --network edgenet_server1 --constraint "node.labels.type == server1" cvasilak/kafka-streams-leshan:0.1-SNAPSHOT org.cvasilak.leshan.kafka.streams.TemperatureStreamsApp kafka-edge:9082 http://schema-registry-edge:8071
		
	Since the output of the analytic resides on a topic at `zeelos-server1` edge, we can either attach a consumer directly or propagate the messages to `zeelos-cloud`. For the latter, we need to edit the replicator configuration to include the `server1_observation_maxper30sec` topic. Visit the excellent [Landoop UI Connectors page](http://192.168.99.100/kafka-connect-ui/#/cluster/fast-data-dev/connector/replicator-server1-gateway-to-cloud) and update the configuration:
	
	![Landoop-UI Replicator Config](https://image.ibb.co/fSAaaw/landoop_ui_replicatior_config.png)
	
	Once done, the replicator will start propagate messages to the `zeelos-cloud`. Attach a consumer to watch it's output:
	
		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_observation_maxper30sec --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
	
		
16. Subscribe on the `zeelos-cloud` Kafka topics to watch all incoming messages coming from `zeelos-server1` edge

		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_registration_new --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
		
		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_registration_up --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
		
		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_registration_del --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
		
		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_observation --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
		

17. Make some requests against the `zeelos-server1` Leshan Server. Notice that clients invoke them on the central `zeelos-cloud` and the request get's propagated on the edge [using the [kafka-connect replicator](https://docs.confluent.io/current/connect/connect-replicator/docs/connect_replicator.html)] and back. 

	First subscribe to the reponse topic to view the reply of your request:

		docker exec -it <kafka-container-id> kafka-avro-console-consumer --topic server1_management_rep --bootstrap-server kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081
		
	Now issue commands by producing messages to the request topic:
	
		docker exec -it <kafka-container-id> kafka-avro-console-producer --topic server1_management_req --property value.schema="$(< ./schemas/request-schema.json)" --broker-list kafka-cloud:9092 --property schema.registry.url=http://schema-registry-cloud:8081

	Format of the requests is as follow (complying to the [Avro request schema](https://github.com/cvasilak/zeelos/blob/master/schemas/request-schema.json))
	
	    --"observe" request--
        {"serverId": "server1", "ep": "<endpoint_id>", "ticket": "myticket", "payload": {"kind": "observe", "path": "/3303/0/5700", "contentFormat": "TLV", "body": null}}
        
    	--"observeCancel" request--
        {"serverId": "server1", "ep": "<endpoint_id>", "ticket": "myticket", "payload": {"kind": "observeCancel", "path": "/3303/0/5700", "contentFormat": "TLV", "body": null}}
            
	    --"read" request--
	    {"serverId": "server1", "ep": "<endpoint_id>", "ticket": "myticket", "payload": {"kind": "read", "path": "/3/0/0", "contentFormat": "TLV", "body": null}}
	        
	    --"write" request--
	    {"serverId": "server1", "ep": "<endpoint_id>", "ticket": "myticket", "payload": {"kind": "write", "path": "/1/0/6", "contentFormat": "TLV", "body":{"org.cvasilak.leshan.avro.request.AvroWriteRequest":{"mode":"REPLACE", "node":{"org.cvasilak.leshan.avro.model.AvroResource":{"id":6,"path":"/1/0/6","kind":"SINGLE_RESOURCE","type":"BOOLEAN","value":{"boolean":true}}}}}}}
	
	    --"execute" request--
	    {"serverId": "server1", "ep": "<endpoint_id>", "ticket": "myticket", "payload": {"kind": "execute", "path": "/3/0/4", "contentFormat": "TLV", "body":{"org.cvasilak.leshan.avro.request.AvroExecuteRequest":{"parameters":""}}}}
	    
	Here is an screenshot of a series of command executions(on top) together with their responses(on bottom):

	![request-response](https://image.ibb.co/eijtpF/request_response_confluent_3_3_0.png)
	
	>requests can target both an "object" (e.g /3), an "object instance" (e.g 3/0), or a specific "resource" (e.g /3/0/1).

## front-ends

[Landoop UI](http://192.168.99.100) (Kafka cluster introspection from [Landoop](http://www.landoop.com/))

[Leshan Server](http://192.168.99.100:8080) (LWM2M Server)

[Grafana](http://192.168.99.100:3000) (Metrics Visualisation)

[OrientDB](http://192.168.99.100:2480) (Model Visualisation)

> username:_root_, password:_secret_
(for Grafana username is _admin_)

## Note about Replication

For replication between the cloud and edge Kafka installations, we chose to use the commercial [Kafka Connect Replicator](https://docs.confluent.io/current/connect/connect-replicator/docs/connect_replicator.html) from Confluent, cause we are familiar with the Connect framework and favour the advantages that it brings. In any case, the open source [MirroMaker](https://docs.confluent.io/current/multi-dc/mirrormaker.html) tool can be used instead and plan to have a version of it in the future.