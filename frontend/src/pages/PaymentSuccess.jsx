import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-3xl border border-line bg-panel p-10 text-center">

        <CheckCircle className="mx-auto w-20 h-20 text-green-500 mb-6" />

        <h1 className="font-display text-4xl font-bold mb-4">
          Payment Successful
        </h1>

        <p className="text-mute mb-8">
          Thank you for shopping with WaveCraft.
          Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="inline-block rounded-full bg-signal text-ink px-8 py-3 font-semibold hover:opacity-90"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}