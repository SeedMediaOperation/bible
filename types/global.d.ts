interface AbaPayWayOptions {
    tran_id: string;
    amount: string | number;
    merchant_id: string;
    qrImage?: string;
    qrString?: string;
    abapay_deeplink?: string;
    description?: string;
    container: HTMLElement;
    checkout: () => void;
    // Add any other properties required by ABA PayWay widget
  }
  
  interface Window {
    ABAPayway?: {
      render: (options: AbaPayWayOptions) => void;
    };
  }

  declare global {
    interface Window {
      AbaPayway: AbaPayWayOptions;
    }
  }
  
  declare const AbaPayway: AbaPayWayOptions;
  