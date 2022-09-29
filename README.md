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

#### Get account from intmaxWallet.

Signer can get account from intmaxWallet.

```js
import { IntmaxWalletSigner } from "webmax";

const signer = new IntmaxWalletSigner();
const account = await signer.connectToAccount();
```

#### Sign transaction.

Signer can sign transactions. You will receive a serialized signature.

```js
import { IntmaxWalletSigner } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
const serializedSignature = await signer.signTransaction(tx);
```

#### Sign and send transaction to network.

Signer can sign and send transactions. You will receive a receipt.

```js
import { IntmaxWalletSigner } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
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
