---
title: Digging into the Sieve of Eratosthenes
date: "2018-10-18T16:51:00.000Z"
layout: post
draft: false
path: "/posts/sieve-of-eratosthenes/"
category: "Computer Science"
tags:
  - "Prime Numbers"
  - "Computer Science"
  - "Mathematics"
description: "Quick look at a simple, ancient method for finding primes"
---

## Sieve of Eratosthenes

After a little [Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) rabbit hole session I came across an interesting method for calculating all primes up to a given limit:

>  In mathematics, the sieve of Eratosthenes is a simple, ancient algorithm for finding all prime numbers up to any given limit.
> [Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)

From the description, it works by creating a set containing all numbers greater than 2 up to the limit. Selecting the first prime and then flagging non primes (composites) as the multiples of that prime. After flagging all composites for the selected prime, it moves on to the next number, which would be a prime and does the same, until reaching the limit. 

A super simple implementation of this would be something along these lines

```
const basic = (limit) => {
  const NumSet = new Set()
  const PrimeSet = new Set()

  for (let p = 2; p <= limit; p++) {
    if (!NumSet.has(p)) {
      PrimeSet.add(p)
      
      for (let k = p; k <= limit; k++) {
        NumSet.add(k * p)
      }
    }
  }

  return PrimeSet
}
```

Note that here I'm using two sets, one containing all the primes and another containing all the composites. It is an extremely naive implementation and would run out of memory for `limits > 15000` with the default nodejs memory limits. 




