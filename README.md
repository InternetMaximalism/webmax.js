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
import { IntmaxWalletSigner, NoRedirect } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
const serializedSignature = await signer.signTransaction<NoRedirect>(tx);
```

#### Sign and send transaction to network

Signer can sign and send transactions. You will receive a receipt.

> If passing `txWait` as the second argument allows the intmaxwallet to control whether to wait for the transaction to be mined.

```ts
import { IntmaxWalletSigner, NoRedirect } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
const receipt = await signer.sendTransaction<NoRedirect>(tx);
```

#### Sign message with intmaxWallet signer

Signer can sign messages. You will receive a signature.

```ts
import { IntmaxWalletSigner, NoRedirect } from "webmax";

const signer = new IntmaxWalletSigner();
const signature = await signer.signMessage<NoRedirect>("hello world");
```

## Redirect Url

You can also use the redirectUrl to send transactions instead of opening child window.

```ts
import { IntmaxWalletSigner, Redirect } from "webmax";

const tx = {
  to,
  value,
  gasLimit,
};

const signer = new IntmaxWalletSigner();
await signer.sendTransaction<Redirect>(tx, true, `${window.location.origin}/redirect`);
```

The user is redirected to the URL set and can receive a signature or receipt using the query parameter.

> You use this redirectUrl when you want to use webmax.js from within a mobile application, for example.

<https://webmax.example.com/redirect?data=0x24xxxxxxxxxxxx>

If an error occurs, you can receive the cause of the error as follows.

<https://oauth2.example.com/auth?error=access_denied>

## Demo

Visit our website:

<https://webmaxdemo.netlify.app/>
