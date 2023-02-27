import { BigNumber } from "bignumber.js";

export const signerType = {
  connect: "connect",
  switchChain: "switchChain",
  signTransaction: "signTransaction",
  sendTransaction: "sendTransaction",
  signMessage: "signMessage",
} as const;

export type SignerType = typeof signerType[keyof typeof signerType];

export type AccountExtraKey = "publicKey";

export type AccountExtraKeys = AccountExtraKey[];

export type ConnectToAccountRequest = {
  extraKeys: AccountExtraKeys;
  overwrite?: boolean;
};

export type IntmaxWalletAccount = {
  address: string;
  chainId: number;
  publicKey?: string;
};

export type Signature = string;

export type SwitchChainParams = {
  chainId: number;
};

export type IntmaxWalletMessageParams = {
  message: Signature;
};

export type IntmaxWalletInteractParams = {
  type: SignerType;
  txWait?: boolean;
  data?:
    | TransactionRequest
    | IntmaxWalletMessageParams
    | SwitchChainParams
    | ConnectToAccountRequest;
};

export type IntmaxWalletEventResponse = {
  message: TransactionReceipt | string;
  result: boolean;
};

export const windowStatus = {
  open: "open",
  closed: "closed",
} as const;

export type WindowStatusType = typeof windowStatus[keyof typeof windowStatus];

export type ChildWindow = {
  window: Window | null;
  status: WindowStatusType;
};

export type Bytes = ArrayLike<number>;

export type BytesLike = Bytes | string;

export type BigNumberish = BigNumber | Bytes | bigint | string | number;

export type AccessList = Array<{ address: string; storageKeys: Array<string> }>;

export type AccessListish =
  | AccessList
  | Array<[string, Array<string>]>
  | Record<string, Array<string>>;

export declare type TransactionReceipt = {
  accessList?: AccessListish;
  chainId?: number;
  confirmations: number;
  data?: BytesLike;
  from?: string;
  gasLimit?: BigNumberish;
  gasPrice?: BigNumberish;
  hash?: string;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
  nonce?: BigNumberish;
  to?: string;
  type?: number;
};

export type TransactionRequest = {
  to?: string;
  from?: string;
  nonce?: BigNumberish;
  gasLimit?: BigNumberish;
  gasPrice?: BigNumberish;
  data?: BytesLike;
  value?: BigNumberish;
  chainId?: number;
  type?: number;
  accessList?: AccessListish;
  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  customData?: Record<string, any>;
  ccipReadEnabled?: boolean;
};
