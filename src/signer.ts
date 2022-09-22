import {
  signType,
  IntmaxWalletTransactionParams,
  IntmaxWalletSignParams,
} from "./interface";
import { config } from "./config";
import { INTMAX_WALLET_WINDOW_NAME } from "./constant";

export class Signer {
  signTransaction({ to, value, gas }: IntmaxWalletTransactionParams) {
    const params = {
      type: signType.transaction,
      data: {
        to,
        value,
        gas,
      },
    };
    const url = this.generateUrl(params);

    window.open(url, INTMAX_WALLET_WINDOW_NAME, "height=600px, width=400px");

    this.addMessageListener();
  }

  private generateUrl(params: IntmaxWalletSignParams): string {
    return (
      `${config.intmaxWalletUrl}/sign?transaction=` +
      encodeURIComponent(JSON.stringify(params))
    );
  }

  private addMessageListener(): void {
    window.addEventListener("message", function (event: any) {
      if (event.origin === config.intmaxWalletUrl) {
        console.log("event", event);
        console.log(event.data);
      }
    });
  }
}
