import { ethers, logger } from "ethers";
import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Logger } from "@ethersproject/logger";
import { Transaction } from "ethers/lib/ethers";

import { IntmaxWalletAccount, TransactionRequest } from "./interface";
import { IntmaxWalletSigner } from "./signer";

const normalizeBigNumber = (value: ethers.BigNumberish | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return ethers.BigNumber.from(value).toString();
};

export class EthersIntmaxWalletSigner extends ethers.Signer implements TypedDataSigner {
  _intmaxWalletSigner: IntmaxWalletSigner;

  constructor(provider: ethers.providers.Provider, account?: null | IntmaxWalletAccount) {
    super();
    ethers.utils.defineReadOnly(this, "provider", provider);
    this._intmaxWalletSigner = new IntmaxWalletSigner(account);
  }

  private mapTransaction(transaction: ethers.providers.TransactionRequest): TransactionRequest {
    const mappedTransaction = {
      to: transaction.to,
      from: transaction.from,
      nonce: normalizeBigNumber(transaction.nonce),
      gasLimit: normalizeBigNumber(transaction.gasLimit),
      gasPrice: normalizeBigNumber(transaction.gasPrice),
      data: transaction.data,
      value: normalizeBigNumber(transaction.value),
      chainId: transaction.chainId,
      type: transaction.type,
      accessList: transaction.accessList,
      maxPriorityFeePerGas: normalizeBigNumber(transaction.maxPriorityFeePerGas),
      maxFeePerGas: normalizeBigNumber(transaction.maxFeePerGas),
      customData: transaction.customData,
      ccipReadEnabled: transaction.ccipReadEnabled,
    };

    return mappedTransaction;
  }

  connect(): ethers.Signer {
    return logger.throwError(
      "cannot alter Intmax Signer connection",
      Logger.errors.UNSUPPORTED_OPERATION,
      { operation: "connect" }
    );
  }

  getAddress(): Promise<string> {
    return this._intmaxWalletSigner.getAddress();
  }

  async signMessage(message: ethers.utils.Bytes | string): Promise<string> {
    if (typeof message !== "string") throw new Error("Byte-like signatures are not supported.");
    const result = await this._intmaxWalletSigner.signMessage(message);
    // Since the class name is EthersIntmaxWalletSigner, it should be used exclusively for EVM.
    if (typeof result !== "string") throw new Error("evm only");
    if (!result) throw new Error("Sign message failed.");
    else return result;
  }

  async signTransaction(transaction: ethers.providers.TransactionRequest): Promise<string> {
    const result = await this._intmaxWalletSigner.signTransaction(this.mapTransaction(transaction));
    // Since the class name is EthersIntmaxWalletSigner, it should be used exclusively for EVM.
    if (typeof result !== "string") throw new Error("evm only");
    if (!result) throw new Error("Sign transaction failed.");
    else return result;
  }

  async sendTransaction(
    transaction: ethers.providers.TransactionRequest
  ): Promise<ethers.providers.TransactionResponse> {
    const result = (await this._intmaxWalletSigner.sendTransaction(
      this.mapTransaction(transaction),
      false
    )) as unknown as Transaction;
    if (!result || !result.hash) throw new Error("Send transaction failed.");
    const tx = await this.provider?.getTransaction(result.hash);
    return tx as ethers.providers.TransactionResponse;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async _signTypedData(_domain: unknown, _types: unknown, _value: unknown): Promise<string> {
    return logger.throwError(
      "Typed data signatures are not supported.",
      Logger.errors.UNSUPPORTED_OPERATION,
      { operation: "_signTypedData" }
    );
  }
}
