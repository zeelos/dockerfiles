FROM grafana/grafana:6.2.4
LABEL maintainer="dev@zeelos.io" description="Grafana - Beautiful metric & analytic dashboards (with zeelosdb build-in)"

# initialize with 'zeelosdb' datasource plus a demo dashboard.
COPY --chown=grafana:grafana ./grafana.db /var/lib/grafana
