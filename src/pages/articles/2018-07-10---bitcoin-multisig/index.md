---
title: Setting up bitcoin multisig with bitcoin-cli
date: "2018-07-10"
layout: post
draft: false
path: "/posts/bitcoin-multisig-cli/"
category: "Bitcoin"
tags:
  - "bitcoin-cli"
  - "Docker"
  - "Bitcoin"
  - "Multisig"
description: "Setup and sign bitcoin multisig address with bitcoin-cli"
---

After a friend asked me how multisig in bitcoin works, I did a little experimenting and found the following method for setting up a multisig address with bitcoin-cli, generating a transaction and signing it with 2/3 before broadcasting it.

### Disclaimer

> This technique should not be used for setting up real addresses. It creates 3 addresses in the same wallet (which makes no sense in the real world). Therefore, this post is merely for educational purposes (mostly mine).

### 0. Setup 

Prerequisite: Docker + docker-compose ([Mac](https://docs.docker.com/docker-for-mac/install/), [Platforms](https://docs.docker.com/install/#supported-platforms)) 

### Setup your bitcoind node
0. Get starter ([bitcoind-docker](https://github.com/Auronmatrix/bitcoind-docker))
   - If you can use git, you can clone the repo otherwise simply download the zip file, extract it and open the folder in your terminal

1. Add the following content to the bitcoin.conf file which enables RPC and sets our node to use testnet

```
printtoconsole=1
testnet=1
server=1
rpcport=8332
prune=2000
```

2. run `docker-compose up -d`
3. open a new terminal tab (cmd+t)
4. run `docker-compose logs -f` and wait for the node to fully sync

> You will need to wait for your node to fully sync.

 *** Note: To stop the docker-container run `docker-compose down`. To delete the blockchain content delete the `data` folder in the bitcoin-node folder

### Shell into your node

1. run `docker ps` and check the docker container id (C_ID) of your bitcoin node
2. run `docker exec -it C_ID /bin/sh`

Now you're inside the docker container with a fully synced bitcoind node on testnet.

### 1. Create addresses

*** Note: Wherever you see these greater than/smaller brackets, you need to replace the value with some output/variable with the name inside the bracked `<VARIABLE>`. You can see the Variable names next to the example output e.g. `Example Output: TXID` will show the value you need to substitute everywhere where you see `<TXID>`

You will need to create a couple (n) new bitcoin addresses to use in the multisig address. In reality, these would not be created on the same machine/node using the same wallet, but by different parties.

*** Where `n` is the number of addresses you want to use in the multisig address

Run `bitcoin-cli getnewaddress` * n

Example Output: ADDR(n)
```
2N3fquuLoTkecwMpBmLiyGzF18R7LLn2dWW
```

You will need some money to send to the multisig address. For educational purposes, let's send some coins to our new `ADDR(n)` address first and then send it on to our multisig address once it has been created.

Visit: [A Testnet Faucet](https://testnet.manu.backend.hamburg/faucet) and send some coins to an address you've just created.

*** You can check if the transaction is confirmed by using `bitcoin-cli gettransaction <FAUCET_TXID>`, where FAUCET_TXID is the transaction ID returned by the faucet

#### 2. Get address Pubkey's

We will need to get the public keys for all the addresses we want to use in our multisig address. To get the public key of an address use run the following cli command:

`bitcoin-cli validateaddress <ADDR(n)>`

*** Where ADDR(n) is 0..n of the addresses we just generated


Example Output: ADDR(n)
```
{
  "isvalid": true,
  "address": "2N3fquuLoTkecwMpBmLiyGzF18R7LLn2dWW",
  "scriptPubKey": "a91472593aaa24c469f1d09af92e13268e2ec8131b7d87",
  "ismine": true,
  "iswatchonly": false,
  "isscript": true,
  "iswitness": false,
  "script": "witness_v0_keyhash",
  "hex": "001492dea8f0ae7ed7d17cdd71efbd42244457a04a7f",
  "pubkey": "02d55b98c30f17bb20a01cbd3e2a58cb607fc088d9b12b2415e09cc122c2827b24", // <-- Note this
  "embedded": {
    "isscript": false,
    "iswitness": true,
    "witness_version": 0,
    "witness_program": "92dea8f0ae7ed7d17cdd71efbd42244457a04a7f",
    "pubkey": "02d55b98c30f17bb20a01cbd3e2a58cb607fc088d9b12b2415e09cc122c2827b24",
    "address": "tb1qjt023u9w0mtazlxaw8hm6s3yg3t6qjnlfqdnz5",
    "scriptPubKey": "001492dea8f0ae7ed7d17cdd71efbd42244457a04a7f"
  },
  "addresses": [
    "tb1qjt023u9w0mtazlxaw8hm6s3yg3t6qjnlfqdnz5"
  ],
  "account": "",
  "timestamp": 1531559244,
  "hdkeypath": "m/0'/0'/5'"
}
```

Take note of the pubkey for each address for example here is the `address : pubkey` for mine:

`2N3fquuLoTkecwMpBmLiyGzF18R7LLn2dWW : 02d55b98c30f17bb20a01cbd3e2a58cb607fc088d9b12b2415e09cc122c2827b24`

### 3. Create MULTISIG Address

Once we have the public key (pubkey) for each address we want to use in the multisig address we can create the multisig address with the following command: 

`bitcoin-cli createmultisig <REQUIRED_SIGS> "[\"<PUBKEY(0)>\", \"<PUBKEY(1)>\", ... \"<PUBKEY(n)>\"] `

*** <REQUIRED_SIGS> = replace this with the actual number of signatures required e.g. for a 3 of 5 address, this parameter would be `3` and the 0..n array afterwards would be the pubkey of addresses 0 to 5

Example Output: MULTISIGADDR / REDEEM_SCRIPT
```
{
  "address": "2NDhNJBynBdrFFkXJJscPhnocwLiiyzoEtE",
  "redeemScript": "522103c8d1554f1029e6fa737b086b408f56a4f468541671230a4288e1f0290051aba621023af945dee9e7fdad745b62b817347eaf0efef84f752f03fbb80a82de61bdd6f62103f18f621896dd4954b593c56fe74530c139c54e372c52a43c15a5a4e89d26cf9153ae"
}
```

Now we have a new multisig address (MULTISIGADDR) `2NDhNJBynBdrFFkXJJscPhnocwLiiyzoEtE` with the script to redeem any bitcoin sent to this address (REDEEM_SCRIPT) `522103c...153ae`

### 4. Send some money to the multisig address

Let's send some money from our address we created in step 1 to our new multisig address:

`bitcoin-cli sendtoaddress <MULTISIGADDR> <AMMOUNT>`

Example Output: TXID
```
5b823105e7d1d6d0c126cb7c3f263de970690d514d846eb317899df2e59ddf2f
```

`bitcoin-cli gettransaction <TXID>`

Example Output: TX
```
{
  "amount": -0.50000000,
  "fee": -0.00000241,
  "confirmations": 0,
  "trusted": true,
  "txid": "TXID",
  "walletconflicts": [
  ],
  "time": 1531660754,
  "timereceived": 1531660754,
  "bip125-replaceable": "no",
  "details": [
    {
      "account": "",
      "address": "2NDhNJBynBdrFFkXJJscPhnocwLiiyzoEtE",
      "category": "send",
      "amount": -0.50000000,
      "vout": 0,
      "fee": -0.00000241,
      "abandoned": false
    }
  ],
  "hex": "0200000000010191ea8abf09f4acc6f549a2623524597640a006cac030a01c8b119f1957389f2501000000171600145741edc69bb806dffed747e41dcd8d08bf96d089feffffff0280f0fa020000000017a914e054443696a6bcd99e732480487f7168e1afa6fa87cfe0e4000000000017a9148337d4673ef5d665e33c67f6a9751ee5074867188702463043021f60da1356671f1eefa5c872bce2ee0a624ac94e89eae07b7446684b02efa47802203538911d9109d209ec1d8d75cf5f2140aa8ba21d125bee60685142c0eabefd760121035717f188ccb1f6c331b17a170ed9588dc15308ee589622f41968f915f7b2b9e971a71400"
}
```

*** Note: Wait for the transaction to confirm before trying to spend it in another input

### 5. Create SEND_TO and CHANGE addresses

Now the multisig address has received some funding (confirmed on chain), let's try to create a transaction that spends these coins to some new addresses.

However, first we should create 2 new addresses, one to receive money from the multisig address, and another to mimic a change address.

*** Note: Since we are using createrawtransaction later on to create our transaction, no change address will be generated automatically, so it is important we generate it ourselves, see [bitcoin.org](https://bitcoin.org/en/developer-examples#simple-raw-transaction)


1. `bitcoin-cli getnewaddress`

Example Output: MULTISIG_SEND_TO_ADDR
```
2MudNu8VFhb1McRMuEBQa2c1e87FpSji8Qs
```

2. `bitcoin-cli getnewaddress`

Example Output: MULTISIG_CHANGE_ADDR
```
2Mtbs7uSqcphyByHadbmtifr78bJpkpZpCJ
```

### 6. Understanding VIN/VOUT


In order to send coins from our multisig address to another one we need to understand VIN and VOUT.

For example. If you look at the following [transaction](https://blockexplorer.com/tx/cafafbae95de6734b2ebffeff37c9a23fcc3977b70fbf856518703bbe0e41015)

It has 4 inputs (VIN: 0, 1, 2, 3, 4) that spends coins to 2 outputs (VOUT: 0, 1). The VOUT for the output for coins to 
- `1NQq4PsRYRw2Gjcqd4BaH4tUaTFT9scn76` = 0 
- `1NtiqTLrVGMrMV8qDbi5L12bCQ6oGV5sKh` = 1

It is important to understand this since you need to use the correct VOUT of the transaction sending coins to our multisig address in order to spend them again.

### 7. Create RAW transaction

 To send money from our multisig addredss we need to use the `<TXID>` of the transaction where we sent money TO our multisig address. For the `<VOUT>`, it should be the index (starting at 0) of the output of that funding transaction that sent coins to our multisig address. Since I funded my multisig address with 0.5 BTC, I'm sending 0.45 to `<MULTISIG_SEND_TO_ADDR>` and 0.049 to `<MULTISIG_CHANGE_ADDR>`, leaving 0.001 BTC to be claimed as fee by the miner.

`bitcoin-cli createrawtransaction "[{\"txid\":\"<TXID>\", \"vout\": 0 }]" "{ \"<MULTISIG_SEND_TO_ADDR>\":0.45, \"<MULTISIG_CHANGE_ADDR>\": 0.049 }"`

Example Output: RAW_TX_HEX
```
02000000012fdf9de5f29d8917b36e844d510d6970e93d263f7ccb26c1d0d6d1e70531825b0000000000ffffffff0240a5ae020000000017a91423c27aee8feaf001906c0aab56a1c9340b4e8d6d87a0c44a000000000017a914e054443696a6bcd99e732480487f7168e1afa6fa8700000000
```

To see the details of this raw transaction run:

`bitcoin-cli decoderawtransaction RAW_TX_HEX`

Example Output: RAW_TX / SCRIPT_PUB_KEY_HEX
```
{
  "txid": "730ab6e3be390979268b9a1bd6fbd966d874844d1896d99bef69380f154efd93",
  "hash": "730ab6e3be390979268b9a1bd6fbd966d874844d1896d99bef69380f154efd93",
  "version": 2,
  "size": 115,
  "vsize": 115,
  "locktime": 0,
  "vin": [
    {
      "txid": "5b823105e7d1d6d0c126cb7c3f263de970690d514d846eb317899df2e59ddf2f",
      "vout": 0,
      "scriptSig": {
        "asm": "",
        "hex": ""
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.45000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_HASH160 23c27aee8feaf001906c0aab56a1c9340b4e8d6d OP_EQUAL",
        "hex": "a91423c27aee8feaf001906c0aab56a1c9340b4e8d6d87", // <-- This is the SCRIPT_PUB_KEY_HEX
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "2MvWJcigHkgMA8TRtXBhzD7whRfUsBwArU3"
        ]
      }
    },
    {
      "value": 0.04900000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_HASH160 e054443696a6bcd99e732480487f7168e1afa6fa OP_EQUAL",
        "hex": "a914e054443696a6bcd99e732480487f7168e1afa6fa87", // <-- This is the SCRIPT_PUB_KEY_HEX
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "2NDhNJBynBdrFFkXJJscPhnocwLiiyzoEtE"
        ]
      }
    }
  ]
}
```

### 8. Sign the transaction

To sign the transaction, you need the private key of at least m/n public keys used to create the address, where `m` is the `<REQUIRED_SIGS>` used to create the address. 

In order to get the private key of one of our generate addresses run:

`bitcoin-cli dumpprivkey <ADDR(n)>`

Example Output: PRIVKEY(n)
```
cUyDg4c17DQPXjVdY2wum22fkMSMcHhrQKWgQ75vFPJupkYsf4qT
```

Once we have `m` (in the example 2) private keys from the addresses used to create the multisig address, we can now sign the raw transaction:


`bitcoin-cli signrawtransaction <RAW_TX_HEX> "[{\"txid\":\"<TXID>\", \"vout\": <VOUT>, \"scriptPubKey\": \"<SCRIPT_PUB_KEY_HEX>\", \"redeemScript\":\"<REDEEM_SCRIPT>\" }]" "[\"<PRIVKEY(0)>\", \"<PRIVKEY(1)>\"]"
`

*** Note: From what I could tell, the `<SCRIPT_PUB_KEY_HEX>` isn't really used. Might be wrong about that

Example Output: SIGNED_RAW_TX 
```
{
  "hex": "02000000012fdf9de5f29d8917b36e844d510d6970e93d263f7ccb26c1d0d6d1e70531825b00000000fdfe0000483045022100b54e338a6d049fa21b329e390eb0c906c85243a7f92049342c37da04c378c46e0220314c7723657d5ce172d1bc1b603c1db4cb376208016a3a9edaa20a13ac94fb950148304502210083f8f845899b59381e68e889ed7eeb9b2e7ca7bb39b2e7c79fab52fff3bce1310220582be5227ba69ec0a03f327746bed569dfb70b402a657c627d8c34a6218e7505014c69522103c8d1554f1029e6fa737b086b408f56a4f468541671230a4288e1f0290051aba621023af945dee9e7fdad745b62b817347eaf0efef84f752f03fbb80a82de61bdd6f62103f18f621896dd4954b593c56fe74530c139c54e372c52a43c15a5a4e89d26cf9153aeffffffff0240a5ae020000000017a91423c27aee8feaf001906c0aab56a1c9340b4e8d6d87a0c44a000000000017a914e054443696a6bcd99e732480487f7168e1afa6fa8700000000",
  "complete": true
}
```

Use the hex code as `<SIGNED_RAW_TX_HEX>`

### 9. Send the RAW transaction

Now we have a valid and signed raw transaction, we can now broadcast this to the bitcoin network.

`bitcoin-cli sendrawtransaction <SIGNED_RAW_TX_HEX>`

Example Output: MULTISIG_TXID
```
b964bfc624e4540b180a19e68eb25a6dcb25a3c5545513f82334dda363d3c0d0
```

Check to see if the transaction is on the network

`bitcoin-cli gettransaction <MULTISIG_TXID>`

Example Output: FINAL_TX
```
{
  "amount": 0.45000000,
  "confirmations": 0,
  "trusted": false,
  "txid": "b964bfc624e4540b180a19e68eb25a6dcb25a3c5545513f82334dda363d3c0d0",
  "walletconflicts": [
  ],
  "time": 1531668769,
  "timereceived": 1531668769,
  "bip125-replaceable": "no",
  "details": [
    {
      "account": "test",
      "address": "2MvWJcigHkgMA8TRtXBhzD7whRfUsBwArU3",
      "category": "receive",
      "amount": 0.45000000,
      "label": "test",
      "vout": 0
    }
  ],
  "hex": "02000000012fdf9de5f29d8917b36e844d510d6970e93d263f7ccb26c1d0d6d1e70531825b00000000fdfe0000483045022100b54e338a6d049fa21b329e390eb0c906c85243a7f92049342c37da04c378c46e0220314c7723657d5ce172d1bc1b603c1db4cb376208016a3a9edaa20a13ac94fb950148304502210083f8f845899b59381e68e889ed7eeb9b2e7ca7bb39b2e7c79fab52fff3bce1310220582be5227ba69ec0a03f327746bed569dfb70b402a657c627d8c34a6218e7505014c69522103c8d1554f1029e6fa737b086b408f56a4f468541671230a4288e1f0290051aba621023af945dee9e7fdad745b62b817347eaf0efef84f752f03fbb80a82de61bdd6f62103f18f621896dd4954b593c56fe74530c139c54e372c52a43c15a5a4e89d26cf9153aeffffffff0240a5ae020000000017a91423c27aee8feaf001906c0aab56a1c9340b4e8d6d87a0c44a000000000017a914e054443696a6bcd99e732480487f7168e1afa6fa8700000000"
}
```

That's it. 

We have successfully, created a multisig address, funded it with some coins, created a raw transaction spending the coins from the multisig address, signed it using 2/3 private keys and broadcast the transaction to the bitcoin network
