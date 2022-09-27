import {
  signType,
  IntmaxWalletTransactionParams,
  IntmaxWalletSignParams,
  IntmaxWalletTransactionResponse,
  IntmaxWalletMessageResponse,
  TransactionReceipt,
  ChildWindow,
  windowStatus,
} from "./interface";

const INTMAX_WALLET_WINDOW_NAME = "intmaxWallet";
const CHILD_WINDOW_WATCH_INTERVAL = 100;

const config = {
  intmaxWalletUrl: "https://intmaxwallet.vercel.app",
};

export class Signer {
  // TODO: window location
  private readonly windowSize = "height=600px, width=400px";

  async signTransaction({
    to,
    value,
    gas,
  }: IntmaxWalletTransactionParams): Promise<TransactionReceipt> {
    const params = {
      type: signType.transaction,
      data: {
        to,
        value,
        gas,
      },
    };
    const cWindow = this.openIntmaxWallet(params);
    const timer = this.watchWindow(
      cWindow,
      "IntmaxWallet Tx Si transaction signature."
    );

    const res =
      await this.eventPromiseListener<IntmaxWalletTransactionResponse>();

    this.clearWatch(timer, cWindow);
    this.closeIntmaxWallet(cWindow);

    return res.message;
  }

  async signMessage(message: string): Promise<string> {
    const params = {
      type: signType.message,
      data: {
        message,
      },
    };
    const cWindow = this.openIntmaxWallet(params);
    const timer = this.watchWindow(
      cWindow,
      "IntmaxWallet Message Signature: User denied message signature."
    );

    const res = await this.eventPromiseListener<IntmaxWalletMessageResponse>();

    this.clearWatch(timer, cWindow);
    this.closeIntmaxWallet(cWindow);

    return res.message;
  }

  private watchWindow(cWindow: ChildWindow, errorMsg: string): NodeJS.Timeout {
    const timer = setInterval(checkChild, CHILD_WINDOW_WATCH_INTERVAL);

    function checkChild(): void {
      if (cWindow.window?.closed && cWindow.status === windowStatus.open) {
        clearInterval(timer);

        throw new Error(errorMsg);
      }
    }

    return timer;
  }

  private clearWatch(timer: NodeJS.Timeout, cWindow: ChildWindow): void {
    cWindow.status = windowStatus.closed;

    clearInterval(timer);
  }

  private openIntmaxWallet(params: IntmaxWalletSignParams): ChildWindow {
    const url = this.generateIntmaxWalletUrl(params);
    const win = window.open(url, INTMAX_WALLET_WINDOW_NAME, this.windowSize);

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

  private generateIntmaxWalletUrl(params: IntmaxWalletSignParams): string {
    return (
      `${config.intmaxWalletUrl}/sign?transaction=` +
      encodeURIComponent(JSON.stringify(params))
    );
  }

  private eventPromiseListener<T>(): Promise<T> {
    return new Promise((resolve) => {
      const listener = (event: MessageEvent) => {
        if (event.origin === config.intmaxWalletUrl) {
          // TODO: FAIL
          window.removeEventListener("message", listener);

          resolve(event.data as T);
        }
      };

      window.addEventListener("message", listener, false);
    });
  }
}
