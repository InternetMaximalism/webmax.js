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

export type IntmaxWalletMessageResponse = {
  message: string;
};
