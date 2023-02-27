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

#### Get account from intmaxWallet

Signer can get account from intmaxWallet.

```ts
import { IntmaxWalletSigner } from "webmax";

const signer = new IntmaxWalletSigner();
const account = await signer.connectToAccount();
```

You can also pass account options in constructor.

> If you pass overwrite as options in constructor, the account will be overwritten.

```ts
import { IntmaxWalletSigner } from "webmax";

const signer = new IntmaxWalletSigner({ address: '0x...', chainId: 1 });
const account = await signer.connectToAccount({ extraKeys: ["publicKey"], overwrite: false });
```

#### Request switch network

Signer can switch network on intmaxWallet.

```ts
import { IntmaxWalletSigner } from "webmax";

const chainId = 1;

const signer = new IntmaxWalletSigner();
const account = await signer.switchChain(chainId);
```

#### Sign transaction

Signer can sign transactions. You will receive a serialized signature.

```ts
import { IntmaxWalletSigner } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
const serializedSignature = await signer.signTransaction(tx);
```

#### Sign and send transaction to network

Signer can sign and send transactions. You will receive a receipt.

> If passing `txwait` as the second argument allows the intmaxwallet to control whether to wait for the transaction to be mined.

```ts
import { IntmaxWalletSigner } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
const receipt = await signer.sendTransaction(tx);
```

#### Sign message with intmaxWallet signer

Signer can sign messages. You will receive a signature.

```ts
import { IntmaxWalletSigner } from "webmax";

const signer = new IntmaxWalletSigner();
const signature = await signer.signMessage("hello world");
```

## Demo

Visit our website:

<https://webmaxdemo.netlify.app/>
