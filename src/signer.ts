import {
  signType,
  IntmaxWalletTransactionParams,
  IntmaxWalletSignParams,
  IntmaxWalletEventResponse,
  TransactionReceipt,
  Signature,
  ChildWindow,
  windowStatus,
} from "./interface";

const INTMAX_WALLET_WINDOW_NAME = "intmaxWallet";
const CHILD_WINDOW_WATCH_INTERVAL = 100;
const INTMAX_WALLET_WINDOW_HEIGHT = 600;
const INTMAX_WALLET_WINDOW_WIDTH = 400;

const config = {
  intmaxWalletUrl: "https://intmaxwallet.vercel.app",
};

export class IntmaxWalletSigner {
  async sendTransaction({
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
      "IntmaxWallet Tx Signature: User denied transaction signature."
    );

    const receipt = await this.interactIntmaxWallet<TransactionReceipt>(
      cWindow,
      timer
    );

    return receipt;
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

    const signature = await this.interactIntmaxWallet<Signature>(
      cWindow,
      timer
    );

    return signature;
  }

  private async interactIntmaxWallet<T>(
    cWindow: ChildWindow,
    timer: NodeJS.Timer
  ): Promise<T> {
    const result = await this.eventPromiseListener<T>()
      .then((value) => value)
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        this.clearWatch(timer, cWindow);
        this.closeIntmaxWallet(cWindow);
      });

    return result;
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

    const top = window.screenY;
    const left =
      window.screenX + window.innerWidth - INTMAX_WALLET_WINDOW_WIDTH;

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

  private generateIntmaxWalletUrl(params: IntmaxWalletSignParams): string {
    return (
      `${config.intmaxWalletUrl}/sign?transaction=` +
      encodeURIComponent(JSON.stringify(params))
    );
  }

  private eventPromiseListener<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      const listener = (event: MessageEvent) => {
        if (event.origin === config.intmaxWalletUrl) {
          window.removeEventListener("message", listener);

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
