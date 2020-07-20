.PHONY: help install dependencies build clean

NAME := tamakii-sandbox/collect-device-info
WORKDIR := /usr/app/collect-device-info
VOLUMES := $(shell pwd):$(WORKDIR)

help:
	@cat $(firstword $(MAKEFILE_LIST))

install: \
	dependencies \
	build

dependencies:
	type docker > /dev/null

build:
	docker build -t $(NAME) .

bash:
	docker run -it --rm $(foreach v,$(VOLUMES),-v $v) $(NAME) bash -l

clean:
	docker image rm $(NAME)

