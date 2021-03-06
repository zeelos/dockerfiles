ARCHITECTURES = amd64 i386 arm32v5 arm32v7 arm64v8
IMAGE_TARGET = debian:stretch-slim
BUILD_BASE = base-kafka_exporter
MULTIARCH = multiarch/qemu-user-static:register
QEMU_VERSION = v2.11.0
VERSION = $(shell cat VERSION)
TAG = $(shell cat VERSION)
#DOCKER_USER = #user#
#DOCKER_PASS = #password#
ifeq ($(REPO),)
  REPO = zeelos/kafka_exporter
endif

all: $(ARCHITECTURES)

$(ARCHITECTURES): base
	@echo "[x]    Building $(REPO):linux-$@-$(TAG)"
	@docker run --rm --privileged $(MULTIARCH) --reset
	@docker build \
			--build-arg BUILD_BASE=$(BUILD_BASE):$(TAG) \
			--build-arg IMAGE_TARGET=$@/$(IMAGE_TARGET) \
			--build-arg QEMU=$(strip $(call qemuarch,$@)) \
			--build-arg QEMU_VERSION=$(QEMU_VERSION) \
			--build-arg ARCH=$@ \
			--build-arg KAFKA_EXPORTER_ARCH=$(strip $(call xgoarch,$@)) \
			--build-arg BUILD_DATE=$(shell date -u +"%Y-%m-%dT%H:%M:%SZ") \
			--build-arg VCS_REF=$(shell git rev-parse --short HEAD) \
			--build-arg VCS_URL=$(shell git config --get remote.origin.url) \
			--build-arg VERSION=$(VERSION) \
			-t $(REPO):linux-$@-$(TAG) .

base:
	@ID=$$(docker images -q $(BUILD_BASE):$(TAG)) && \
	if test "$$ID" = ""; then \
	    echo "[x]    Building Base Image $(BUILD_BASE):$(TAG)"; \
			docker build \
					--build-arg VERSION=$(VERSION) \
					-f Dockerfile.compile -t $(BUILD_BASE):$(TAG) .; \
	else \
			echo "[x]    Image $(BUILD_BASE):$(TAG) already exists"; \
	fi

push:
	@docker login $(REPO) -u $(DOCKER_USER) -p "$(DOCKER_PASS)"
	@$(foreach arch,$(ARCHITECTURES), docker push $(REPO):linux-$(arch)-$(TAG);)
	@docker logout $(REPO)

manifest:
	@wget -O docker https://6582-88013053-gh.circle-artifacts.com/1/work/build/docker-linux-amd64
	@chmod +x docker
	@./docker login $(REPO) -u $(DOCKER_USER) -p "$(DOCKER_PASS)"
	@./docker manifest create $(REPO):$(TAG) \
			$(foreach arch,$(ARCHITECTURES), $(REPO):linux-$(arch)-$(TAG)) --amend
	@$(foreach arch,$(ARCHITECTURES), ./docker manifest annotate \
			$(REPO):$(TAG) $(REPO):linux-$(arch)-$(TAG) \
			--os linux $(strip $(call convert_variants,$(arch)));)
	@./docker manifest push $(REPO):$(TAG)
	@./docker logout $(REPO)
	@rm -f docker

test:
	@docker network create -d bridge trial
	@$(foreach arch,$(ARCHITECTURES), docker run \
			--kafka.server=kafka-edge:9082 \
			--web.listen-address=:8080 \
			--no-tls.enabled \
			--tls.insecure-skip-tls-verify \
			--publish=8080:8080 \
			--detach=true \
			--name=kafka_exporter \
			$(REPO):linux-$(arch)-$(TAG); \
			sleep 10; \
			docker run --network trial \
				jwilder/dockerize dockerize -wait tcp://kafka_exporter:8080 -timeout 300s; \
			curl -sSL --retry 10 --retry-delay 5 localhost:8080/metrics; \
			docker rm -f kafka_exporter;)
	@docker network rm trial

clean:
	@echo "[x]    Removing Images"
	@docker rmi -f $(BUILD_BASE):$(TAG)
	@$(foreach arch,$(ARCHITECTURES), docker rmi -f $(REPO):linux-$(arch)-$(TAG);)

define qemuarch
	$(shell echo $(1) | sed -e "s|arm32.*|arm|g" -e "s|arm64.*|aarch64|g" -e "s|amd64|x86_64|g")
endef

define xgoarch
	$(shell echo $(1) | sed -e "s|arm32v5|arm-5|g" -e "s|arm32v6|arm-6|g" -e "s|arm32v7|arm-7|g" -e "s|arm64.*|arm64|g" -e "s|i386|386|g")
endef

define convert_variants
	$(shell echo $(1) | sed -e "s|amd64|--arch amd64|g" -e "s|i386|--arch 386|g" -e "s|arm32v5|--arch arm --variant v5|g" -e "s|arm32v6|--arch arm --variant v6|g" -e "s|arm32v7|--arch arm --variant v7|g" -e "s|arm64v8|--arch arm64 --variant v8|g" -e "s|ppc64le|--arch ppc64le|g" -e "s|s390x|--arch s390x|g")
endef
