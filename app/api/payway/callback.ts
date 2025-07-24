import { routing } from "@/lib/i18n/routing";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, order_id } = req.query;

  // TODO: Validate response hash to prevent tampering

  if (status === "success") {
    // TODO: Update order status in DB as paid
    res.redirect(`${routing.defaultLocale}/payment-success?orderId=${order_id}`);
  } else {
    res.redirect(`${routing.defaultLocale}/payment-failure?orderId=${order_id}`);
  }
}
