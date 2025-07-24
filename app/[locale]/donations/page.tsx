"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

const generateOrderId = () => Date.now().toString();
const MERCHANT_ID = "ec000262";
const getPaywayApiUrl =
  "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase";

const DonationForm = () => {
  const [form, setForm] = useState({
    req_time: "",
    tran_id: "",
    merchant_id: MERCHANT_ID,
    amount: 0,
    firstname: "to",
    lastname: "la",
    email: "tola@gmail.com",
    type: "pre-auth",
    payment_option: "wechat",
    currency: "USD",
    return_params: "Hello World",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const newId = generateOrderId();
    setForm((prev) => ({
      ...prev,
      req_time: newId,
      tran_id: newId,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const url = getPaywayApiUrl;

    setLoading(true);

    try {
      const res = await fetch("/api/donations/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to generate hash");

      const data = await res.json();

      // Create a form element for submission to ABA PayWay
      const paymentForm = document.createElement("form"); // Renamed to avoid shadowing
      paymentForm.method = "POST";
      paymentForm.action = url;

      const addInput = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        paymentForm.appendChild(input);
      };

      addInput("hash", data.hash);
      addInput("tran_id", form.tran_id);
      addInput("merchant_id", form.merchant_id);
      addInput("amount", form.amount.toString());
      addInput("firstname", form.firstname);
      addInput("lastname", form.lastname);
      addInput("email", form.email);
      addInput("return_params", form.return_params);
      addInput("type", form.type);
      addInput("currency", form.currency);
      addInput("payment_option", form.payment_option);
      addInput("req_time", form.req_time);

      if (typeof window !== "undefined" && document?.body) {
        document.body.appendChild(paymentForm);
        paymentForm.submit();
        document.body.removeChild(paymentForm);
      }
      
      if (typeof AbaPayway !== "undefined") {
        AbaPayway.checkout();
      } else {
        console.warn("AbaPayway is not loaded yet.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Something went wrong!");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.payway.com.kh/plugins/checkout2-0.js" />

      <form onSubmit={handleSubmit} className="w-full md:flex md:gap-2">
        <div className="w-full md:w-[60%]">
          <div className="flex items-center justify-center space-x-2">
          {["USD", "KHR"].map((option) => (
            <label
              key={option}
              className={`w-full p-2 md:p-3 rounded-full cursor-pointer transition-all ${
                form.currency === option ? "bg-[#4FC9EE]" : "bg-white"
              }`}
            >
              <h1
                className={`text-[15px] xl:text-[24px] font-[600] text-center ${
                  form.currency === option ? "text-white" : "text-[#4FC9EE]"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </h1>
              <input
                type="radio"
                name="currency"
                value={option} // ✅ FIXED
                onChange={handleChange}
                className="hidden"
                checked={form.currency === option}
              />
            </label>
          ))}

          </div>

          <input
            type="text"
            name="req_time"
            value={form.req_time}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="tran_id"
            value={form.tran_id}
            onChange={handleChange}
            className="hidden"
          />
           <input
            type="text"
            name="merchant_id"
            value={form.merchant_id}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="payment_option"
            value={form.payment_option}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="hidden"
          />
          <input
            type="text"
            name="return_params"
            value={form.return_params}
            onChange={handleChange}
            className="hidden"
          />

          <div className="my-3">
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={form.amount === 0 ? "" : form.amount}
              onChange={handleChange}
              required
              min={1}
              className="w-full xl:text-[30px] py-2 rounded-full text-white placeholder:text-white bg-[#4FC9EE] px-6 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[40%] h-full rounded-full bg-[#4FC9EE] shadow-sm drop-shadow-lg py-5 xl:py-9"
        >
          {loading ? (
            <span className="text-white font-bold">Processing...</span>
          ) : (
            <Image
              src="/donate.svg"
              alt="Donate"
              width={1920}
              height={1080}
              quality={100}
              className="w-[50px] h-[48px] md:w-[300px] md:h-[60px] mx-auto object-contain"
            />
          )}
        </button>
      </form>
    </>
  );
};

export default DonationForm;