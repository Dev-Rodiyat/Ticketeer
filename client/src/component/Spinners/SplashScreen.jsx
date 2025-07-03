import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import TicketeerLogo from "./../../assets/Ticketeer-Logo.png";

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
        >
          {/* Confetti Background */}
          <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            recycle={true}
            colors={['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5']}
            gravity={0.1}
            wind={0.02}
            initialVelocityY={5}
            opacity={0.6}
          />

          <motion.img
            src={TicketeerLogo}
            alt="Ticketeer Logo"
            className="w-[120px] h-auto object-contain mb-6 z-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.p
            className="text-orange-700 text-3xl font-bold mb-2 z-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Welcome to Ticketeer
          </motion.p>

          <motion.p
            className="text-orange-600 text-lg font-medium z-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Discover events. Book tickets. Simple.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;