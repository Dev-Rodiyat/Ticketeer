import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import TicketeerLogo from "./../../assets/Ticketeer-Logo.png";

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 5000); // Extended to 5 seconds for testing
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Initialize particles with error logging
  const particlesInit = useCallback(async (engine) => {
    try {
      console.log("Initializing particles engine...");
      await loadSlim(engine);
      console.log("Particles engine initialized successfully.");
    } catch (error) {
      console.error("Particles initialization failed:", error);
    }
  }, []);

  // Particle options (simplified for testing)
  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: true },
      background: { color: "transparent" },
      particles: {
        number: { value: 50 },
        color: { value: "#ff0000" }, // Bright red for visibility
        shape: { type: "circle" },
        opacity: { value: 0.8 },
        size: { value: 10 }, // Larger size for testing
        move: { enable: true, speed: 3, outModes: { default: "out" } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center 
            bg-gradient-to-br from-orange-100 via-white to-zinc-50 
            dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
        >
          {/* Particles Background */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 40 }} // Explicit z-index
          />

          {/* Foreground content */}
          <motion.img
            src={TicketeerLogo}
            alt="Ticketeer Logo"
            className="w-[120px] h-auto object-contain mb-6 z-[60]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.p
            className="text-orange-700 text-3xl font-bold mb-2 z-[60]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Welcome to Ticketeer
          </motion.p>

          <motion.p
            className="text-orange-600 text-lg font-medium z-[60]"
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