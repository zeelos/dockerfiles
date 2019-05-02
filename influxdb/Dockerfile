FROM influxdb:1.7.6
LABEL maintainer="dev@zeelos.io" description="InfluxDB - The Platform for Time-Series Data (with zeelosdb build-in)"

# initialize influxdb with an empty 'zeelosdb' database
ADD ./databases/zeelosdb.tar.gz /var/lib
