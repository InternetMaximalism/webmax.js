# webmax.js

webmax is intmaxwallet signer library.

## Installation

#### With yarn

```sh
yarn add webmax
```

#### With npm

```sh
npm install webmax
```

## Usage

Add intmaxWalletSigner to your app first.

#### Sign and send transaction to network.

Signer can sign and send transactions. You will receive a receipt.

```js
import { IntmaxWalletSigner } from "webmax";

const tx = {
  to,
  value,
  gas,
};

const signer = new IntmaxWalletSigner();
const receipt = await signer.sendTransaction(tx);
```

#### Sign message with intmaxWallet signer.

Signer can sign messages. You will receive a signature.

```js
import { IntmaxWalletSigner } from "webmax";

const signer = new IntmaxWalletSigner();
const signature = await signer.signMessage("hello world");
```

## Demo

See the demo on the website:

https://webmaxdemo.netlify.app/
