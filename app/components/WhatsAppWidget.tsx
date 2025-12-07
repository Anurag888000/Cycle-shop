"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [message, setMessage] = useState("");

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const phone = "918090529034";
    const text = message || "Hi! I'm interested in your bicycles.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessage("");
  };

  const quickMessages = [
    "I want to buy a bicycle",
    "What's the price range?",
    "Do you have kids bikes?",
    "Service inquiry",
  ];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              {/* Pulse Ring */}
              {showPulse && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-green-500 rounded-full"
                />
              )}
              
              {/* Main Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center text-white hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
              </motion.button>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                Chat with us! 💬
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚴</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Waheed Cycles</h3>
                  <p className="text-xs text-white/80">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[150px]">
              {/* Welcome Message */}
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%]">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  👋 Hi! Welcome to Waheed Cycle Shop. How can we help you today?
                </p>
                <span className="text-xs text-gray-400 mt-1 block">Just now</span>
              </div>

              {/* Quick Reply Options */}
              <div className="mt-4 flex flex-wrap gap-2">
                {quickMessages.map((msg, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => setMessage(msg)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition"
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#20bd5a] transition"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
