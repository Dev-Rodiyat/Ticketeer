import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import Loader from "../../Spinners/Loader";

const AddTicketModal = ({ isOpen, onClose, event, getEventDetails }) => {
  console.log(getEventDetails);
  const { eventId } = useParams();
  console.log(eventId);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState({
    type: "",
    price: "",
    totalQuantity: "",
  });
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const createTicket = async () => {
    if (event?.ticketTypes.length >= 5) {
      toast.error("You can only add up to 5 ticket types per event.");
      return;
    }

    if (!ticketData.type || !ticketData.price || !ticketData.totalQuantity) {
      toast.error("Missing required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/event/create-ticket/${eventId}`,
        ticketData,
        {
          withCredentials: true,
        }
      );

      if (response?.data) {
        setTicket(response?.data);
        toast.success("Ticket Created Successfully");
        console.log("Refetching event...");
        await getEventDetails();
        console.log("Refetch complete.");
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Internal server error";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false); // ✅ Properly turn it off after
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTicket();
  };

  // if (loading) {
  //   return <Loader loading={loading} />;
  // }

  return (
    <Transition appear show={isOpen} as={Fragment} className="font-inter">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] p-6 shadow-xl transition-all">
                {/* Back Button */}
                <div className="mb-2">
                  <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition"
                    onClick={onClose}
                  >
                    <IoArrowBackOutline
                      size={22}
                      className="text-gray-700 dark:text-zinc-200"
                    />
                  </button>
                </div>

                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Add Ticket Type
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      name="type"
                      required
                      value={ticketData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] px-3 py-2 text-sm text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price (₦)
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={ticketData.price}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] px-3 py-2 text-sm text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="totalQuantity"
                      required
                      value={ticketData.totalQuantity}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] px-3 py-2 text-sm text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${
                        loading
                          ? "bg-orange-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      } text-white px-4 py-2 rounded-full text-sm flex items-center gap-2`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4l3.536-3.536a1 1 0 10-1.414-1.414L12 4.586V0a12 12 0 00-8 20.485l1.414-1.414A9.959 9.959 0 014 12z"
                            />
                          </svg>
                          Creating...
                        </>
                      ) : (
                        "Create Ticket"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTicketModal;
