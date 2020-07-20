FROM node:14.5.0

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      chromium \
      chromium-driver \
      less \
      && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR "/usr/app/collect-device-info"
