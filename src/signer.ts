import {
  ChildWindow,
  ConnectToAccountRequest,
  IntmaxWalletAccount,
  IntmaxWalletEventResponse,
  IntmaxWalletInteractParams,
  Signature,
  signerType,
  TransactionReceipt,
  TransactionRequest,
  windowStatus,
} from "./interface";

const INTMAX_WALLET_WINDOW_NAME = "intmaxWallet";
const CHILD_WINDOW_WATCH_INTERVAL = 100;
const INTMAX_WALLET_WINDOW_HEIGHT = 600;
const INTMAX_WALLET_WINDOW_WIDTH = 400;

const config = {
  intmaxWalletUrl: "https://www.intmaxwallet.io",
};

type Reject = (msg: string) => void;

export class IntmaxWalletSigner {
  private _account?: IntmaxWalletAccount | null;

  constructor(account?: null | IntmaxWalletAccount) {
    this._account = account;
  }

  async connectToAccount(request?: ConnectToAccountRequest): Promise<IntmaxWalletAccount> {
    if (this._account && !request?.overwrite) {
      return this._account;
    }
    const params = {
      type: signerType.connect,
      data: {
        extraKeys: request?.extraKeys ?? [],
      },
    };

    this._account = await this.interactIntmaxWallet<IntmaxWalletAccount>(
      params,
      "IntmaxWallet Connect: User Rejected."
    );

    return this._account;
  }

  isConnected(): boolean {
    return !!this._account;
  }

  async getAddress(): Promise<string> {
    const account = await this.connectToAccount();

    return account.address;
  }

  async getChainId(): Promise<number> {
    const account = await this.connectToAccount();

    return account.chainId;
  }

  async getPublicKey(): Promise<string | null> {
    const account = await this.connectToAccount();

    return account.publicKey ?? null;
  }

  async signTransaction(transaction: TransactionRequest): Promise<string> {
    const params = {
      type: signerType.signTransaction,
      data: transaction,
    };

    const serializedSignature = await this.interactIntmaxWallet<string>(
      params,
      "IntmaxWallet Tx Signature: User denied transaction signature."
    );

    return serializedSignature;
  }

  async sendTransaction(
    transaction: TransactionRequest,
    txWait = true
  ): Promise<TransactionReceipt> {
    const params = {
      type: signerType.sendTransaction,
      data: transaction,
      txWait,
    };

    const receipt = await this.interactIntmaxWallet<TransactionReceipt>(
      params,
      "IntmaxWallet Tx Send: User denied send transaction."
    );

    return receipt;
  }

  async signMessage(message: string): Promise<string> {
    const params = {
      type: signerType.signMessage,
      data: {
        message,
      },
    };

    const signature = await this.interactIntmaxWallet<Signature>(
      params,
      "IntmaxWallet Message Signature: User denied message signature."
    );

    return signature;
  }

  async switchChain(chainId: number): Promise<IntmaxWalletAccount> {
    if (!this.isConnected()) {
      await this.connectToAccount();
    }
    const params = {
      type: signerType.switchChain,
      data: {
        chainId,
      },
    };

    this._account = await this.interactIntmaxWallet<IntmaxWalletAccount>(
      params,
      "IntmaxWallet SwitchChain: User Rejected."
    );

    return this._account;
  }

  private async interactIntmaxWallet<T>(
    params: IntmaxWalletInteractParams,
    errorMsg: string
  ): Promise<T> {
    const result = await this.eventPromiseListener<T>(params, errorMsg)
      .then((value) => value)
      .catch((error) => {
        throw new Error(error);
      });

    return result;
  }

  private watchWindow(cWindow: ChildWindow, errorMsg: string, reject: Reject): NodeJS.Timeout {
    const timer = setInterval(checkChild, CHILD_WINDOW_WATCH_INTERVAL);

    function checkChild(): void {
      if (cWindow.window?.closed && cWindow.status === windowStatus.open) {
        clearInterval(timer);
        reject(errorMsg);
      }
    }

    return timer;
  }

  private clearWatch(timer: NodeJS.Timeout, cWindow: ChildWindow): void {
    cWindow.status = windowStatus.closed;

    clearInterval(timer);
  }

  private openIntmaxWallet(url: string): ChildWindow {
    const top = window.screenY;
    const left = window.screenX + window.innerWidth - INTMAX_WALLET_WINDOW_WIDTH;

    const win = window.open(
      url,
      INTMAX_WALLET_WINDOW_NAME,
      `top=${top}px, left=${left}px, height=${INTMAX_WALLET_WINDOW_HEIGHT}px, width=${INTMAX_WALLET_WINDOW_WIDTH}px`
    );

    return {
      window: win,
      status: windowStatus.open,
    };
  }

  private closeIntmaxWallet(cWindow: ChildWindow): void {
    if (!cWindow.window) {
      return;
    }

    return cWindow.window.close();
  }

  private generateIntmaxWalletSignUrl(params: IntmaxWalletInteractParams): string {
    return `${config.intmaxWalletUrl}/signer?params=` + encodeURIComponent(JSON.stringify(params));
  }

  private eventPromiseListener<T>(
    params: IntmaxWalletInteractParams,
    errorMsg: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = this.generateIntmaxWalletSignUrl(params);

      const cWindow = this.openIntmaxWallet(url);
      const timer = this.watchWindow(cWindow, errorMsg, reject);

      const listener = (event: MessageEvent) => {
        if (event.origin === config.intmaxWalletUrl) {
          window.removeEventListener("message", listener);

          this.clearWatch(timer, cWindow);
          this.closeIntmaxWallet(cWindow);

          const data = event.data as IntmaxWalletEventResponse;
          if (!data.result) {
            return reject(data.message as string);
          }
          resolve(event.data.message as T);
        }
      };

      window.addEventListener("message", listener, false);
    });
  }
}
