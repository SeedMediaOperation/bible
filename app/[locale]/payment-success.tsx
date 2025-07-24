import { useRouter } from "next/router";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p>Your order ID: <strong>{orderId}</strong></p>
    </div>
  );
};

export default PaymentSuccess;
