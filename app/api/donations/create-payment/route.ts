import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.ABA_PAYWAY_SECRET_KEY!;
const MERCHANT_ID = process.env.ABA_PAYWAY_MERCHANT_ID!;

function getHash(str: string): string {
  const hmac = crypto.createHmac("sha512", SECRET);
  hmac.update(str);
  return hmac.digest("base64");
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      req_time,
      merchant_id = MERCHANT_ID,
      tran_id,
      amount,
      firstname,
      lastname,
      email,
      type,
      payment_option,
      currency,
      return_params,
    } = data;

    const required = [
      req_time,
      merchant_id,
      tran_id,
      amount,
      firstname,
      lastname,
      email,
      type,
      payment_option,
      currency,
      return_params,
    ];

    if (required.some((f) => !f)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stringToHash = 
    req_time +
    merchant_id +
    tran_id +
    amount +
    firstname +
    lastname +
    email +
    type +
    payment_option +
    currency +
    return_params

    const hash = getHash(stringToHash);

    if (
      ["abapay_khqr_deeplink"].includes(payment_option)
    ) {
      const params = new URLSearchParams({
        hash,
        req_time,
        merchant_id,
        tran_id,
        amount,
        firstname,
        lastname,
        email,
        type,
        payment_option,
        currency,
        return_params,
      });
         // Add qr_image_template only if provided

      const res = await fetch(
        "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      const json = await res.json();
      return NextResponse.json(json);
    }

    return NextResponse.json({ hash });

  } catch (err) {
    console.error("Payment API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
