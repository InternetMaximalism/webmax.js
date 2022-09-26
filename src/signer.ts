import {
  signType,
  IntmaxWalletTransactionParams,
  IntmaxWalletSignParams,
  IntmaxWalletMessageResponse,
} from "./interface";
import { INTMAX_WALLET_WINDOW_NAME } from "./constant";
import { config } from "./config";

export class Signer {
  private readonly windowSize = "height=600px, width=400px";

  async signTransaction({ to, value, gas }: IntmaxWalletTransactionParams) {
    const params = {
      type: signType.transaction,
      data: {
        to,
        value,
        gas,
      },
    };
    const cWindow = this.openIntmaxWallet(params);

    await this.eventPromiseListener();

    this.closeIntmaxWallet(cWindow);
  }

  async signMessage(message: string): Promise<string> {
    const params = {
      type: signType.message,
      data: {
        message,
      },
    };
    const cWindow = this.openIntmaxWallet(params);

    const res = await this.eventPromiseListener<IntmaxWalletMessageResponse>();

    this.closeIntmaxWallet(cWindow);

    return res.message;
  }

  private openIntmaxWallet(params: IntmaxWalletSignParams): Window | null {
    const url = this.generateIntmaxWalletUrl(params);

    return window.open(url, INTMAX_WALLET_WINDOW_NAME, this.windowSize);
  }

  private closeIntmaxWallet(cWindow: Window | null): void {
    if (!cWindow) {
      return;
    }

    return cWindow.close();
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
          window.removeEventListener("message", listener);

          resolve(event.data as T);
        }
      };

      window.addEventListener("message", listener, false);
    });
  }
}
