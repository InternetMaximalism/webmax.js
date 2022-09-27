import { BigNumber } from "bignumber.js";

export const signType = {
  transaction: "transaction",
  message: "message",
} as const;

export type SignType = typeof signType[keyof typeof signType];

export type IntmaxWalletTransactionParams = {
  to: string;
  value: string;
  gas: number;
};

export type IntmaxWalletMessageParams = {
  message: string;
};

export type IntmaxWalletSignParams = {
  type: SignType;
  data: IntmaxWalletTransactionParams | IntmaxWalletMessageParams;
};

export type IntmaxWalletTransactionResponse = {
  message: TransactionReceipt;
};

export type IntmaxWalletMessageResponse = {
  message: string;
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
