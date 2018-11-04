---
title: Running your own Bitcoin full node with Docker
date: "2018-10-18T16:51:00.000Z"
layout: post
draft: false
path: "/posts/deploying-bitcoin-with-docker/"
category: "Docker"
tags:
  - "Docker"
  - "Bitcoin"
  - "Nodes"
  - "Docker-compose"
description: "Setting up and deploying your first bitcoin full node with docker and docker-compose"
---

## Setting up

While developing different blockchain tools, the requirement of spinning up a new full node for testing comes up quite often.

In order to speed up this process, I've come to build and run bitcoin-core inside a docker container. I've found the images maintained by [@ruimarinho](https://github.com/ruimarinho) very usefull and working straight OOTB.

https://github.com/ruimarinho/docker-bitcoin-core