import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Spinners/Loader";

export default function UsingHooks({ user, event, selectedTickets, tickets }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // NEW

  // Calculate total with 2% fee
  const total = selectedTickets.reduce((sum, { ticketTypeId, quantity }) => {
    const ticket = tickets.find((t) => t._id === ticketTypeId);
    if (!ticket) return sum;
    const fee = ticket.price * 0.02;
    return sum + (ticket.price + fee) * quantity;
  }, 0);

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: total,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: user?.email,
      phone_number: "070********", // optional: user.phone
      name: user?.name,
    },
    customizations: {
      title: event?.title,
      description: `Payment for ${event?.title} tickets`,
      logo: event?.image?.imageUrl,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      // Step 1: Validate tickets
      const validationRes = await api.post(
        "/payments/validate",
        {
          selectedTickets,
          eventId: event._id,
        },
        { withCredentials: true }
      );

      if (!validationRes.data.success) {
        toast.error(validationRes.data.message || "Ticket validation failed.");
        setIsLoading(false);
        return;
      }

      // Step 2: Launch Flutterwave payment
      handleFlutterPayment({
        callback: async (response) => {
          closePaymentModal();
          setIsVerifying(true); // NEW: show loader after popup success

          try {
            const res = await api.post(
              "/payments/flutterwave/verify",
              {
                transaction_id: response.transaction_id,
                eventId: event._id,
                selectedTickets,
              },
              { withCredentials: true }
            );

            const tickets = res.data.tickets;

            if (res.data.success) {
              toast.success("Payment Successful!");
              navigate("/payment-success", {
                state: { event, selectedTickets, tickets },
              });
            } else {
              toast.error("Payment verification failed.");
              navigate("/payment-failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed!");
            navigate("/payment-failed");
          } finally {
            setIsVerifying(false);
            setIsLoading(false);
          }
        },
        onClose: () => {
          setIsLoading(false);
          toast.error("Payment closed");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Validation or payment failed."
      );
      setIsLoading(false);
    }
  };

  if (!user || !event?._id || total === 0) return null;

  if (isVerifying) {
    return <Loader loading={isVerifying} />;
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`mt-4 self-start px-10 py-3 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        } text-white font-semibold rounded-full transition`}
      >
        {isLoading ? "Processing..." : `Pay ₦${total.toFixed(2)}`}
      </button>
    </>
  );
}
