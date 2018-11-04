---
title: Generating PEM encoded keys with OpenSSL
date: "2018-10-18T16:51:00.000Z"
layout: post
draft: false
path: "/posts/generating-ec-keypair-for-json-web-tokens/"
category: "Cryptography"
tags:
  - "ES512"
  - "RS256"
  - "JWT"
  - "Json Web Tokens"
  - "Cryptography"
  - "Open SSL"
description: "Using OpenSSL to generate PEM encoded keys for `jsonwebtoken`"
---

## Generating PEM encoded keys with OpenSSL

While working on a small authentication microservice, I found myself needing to generate PEM encoded keys for use with `jsonwebtoken`. 

Since my authentication middleware would require verifying the signature of the token using the pubkey, using a shared secret would not be possible. 

I came across this [gist](https://gist.github.com/maxogden/62b7119909a93204c747633308a4d769) by [@maxogden](https://github.com/maxogden) which uses the `jwa` module, but can be adapted for the Auth0 `jsonwebtoken` module.

`gist:16a67d9994641eb87c339dbd6b389c2d`