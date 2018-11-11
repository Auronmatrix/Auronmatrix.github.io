---
title: Running your own Bitcoin full node with Docker
date: "2018-10-15"
layout: post
draft: false
path: "/posts/deploying-bitcoind-with-docker-and-compose/"
category: "Docker"
tags:
  - "Docker"
  - "Bitcoin"
  - "Nodes"
  - "Docker-compose"
description: "Running your own bitcoind full node with docker/docker-compose"
---

## Running your own bitcoind full node with docker/docker-compose

While developing different bitcoin tools, the requirement of spinning up a new full node for testing comes up quite often.

In order to speed up this process, I've come to build and run bitcoin-core inside a docker container quite often.

I've created a bootstrapping repo [bitcoind-docker](https://github.com/Auronmatrix/bitcoind-docker) based on the work of [@ruimarinho](https://github.com/ruimarinho) adding some small fixes, docker-compose and rpcauth script for generating rpc user and the example bitcoin.conf file from bitcoin-core. 

#### 1. Clone:

- `git clone https://github.com/Auronmatrix/bitcoind-docker`
- `cd bitcoind-docker`

#### 2. Configure

Configure the bitcoin.conf file to be relevant to your requirements. Commonly used commands include -server=1, -printtoconsole=1 and -regtest=1. These commands can also be added to the compose file under the `command` property.

See the bitcoin.conf for details on available commands.

#### 3. Enable RPC

If you wish to enable the bitcoind rpc server, you should generate the login credentials for the RPC-USER.

- `cd rpcauth`
- `python3 rpcauth.py yourusername yoursupersecretpassword` 

Copy output to `bitcoin.conf` or add as command to `docker-compose.yml`. Make sure you set `-server=1` in either and check out the rpc binding options for allowing rpc access from outside the container.

#### 4. Building and running

Once the config has been set up, run the container

- `docker-compose build`
- `docker-compose up -d`

View the logs with `docker-compose logs -f`

This should be enough to get you started with running your own bitcoin node. Make sure to study up the different configuration options. 


