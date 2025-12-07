"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles, PartyPopper } from "lucide-react";

interface Prize {
  text: string;
  color: string;
  discount: string;
}

const prizes: Prize[] = [
  { text: "10% OFF", color: "#FF6B6B", discount: "10%" },
  { text: "Free Service", color: "#4ECDC4", discount: "FREE SERVICE" },
  { text: "5% OFF", color: "#45B7D1", discount: "5%" },
  { text: "₹500 OFF", color: "#96CEB4", discount: "₹500" },
  { text: "15% OFF", color: "#FFEAA7", discount: "15%" },
  { text: "Free Helmet", color: "#DDA0DD", discount: "FREE HELMET" },
  { text: "₹200 OFF", color: "#98D8C8", discount: "₹200" },
  { text: "20% OFF", color: "#F7DC6F", discount: "20%" },
];

const gradientLayers = [
  {
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 45%)",
    duration: 8,
    delay: 0,
    opacity: 0.65,
  },
  {
    gradient:
      "radial-gradient(circle at 80% 0%, rgba(76,29,149,0.6), rgba(99,102,241,0.01) 65%)",
    duration: 12,
    delay: 1.2,
    opacity: 0.55,
  },
  {
    gradient:
      "radial-gradient(circle at 50% 100%, rgba(236,72,153,0.45), transparent 55%)",
    duration: 10,
    delay: 0.4,
    opacity: 0.65,
  },
];

export default function SpinWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [showPrize, setShowPrize] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if user has already spun
  useEffect(() => {
    const spunToday = localStorage.getItem("wheelSpunDate");
    const today = new Date().toDateString();
    if (spunToday === today) {
      setHasSpun(true);
    }

    // Show floating button after 3 seconds
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Draw the wheel - run when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure canvas is mounted
    const drawWheel = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sliceAngle = (2 * Math.PI) / prizes.length;

      prizes.forEach((prize, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Arial";
        ctx.fillText(prize.text, radius - 20, 5);
        ctx.restore();
      });

      // Center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
      ctx.fillStyle = "#4F46E5";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Center text
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("SPIN", centerX, centerY + 4);
    };

    // Use requestAnimationFrame to ensure canvas is ready
    requestAnimationFrame(drawWheel);
  }, [isOpen]);

  const spinWheel = async () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setPrize(null);
    setShowPrize(false);

    // Random number of full rotations (3-5) plus random prize position
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const sliceAngle = 360 / prizes.length;
    const targetRotation =
      rotation +
      360 * (3 + Math.random() * 2) + // 3-5 full rotations
      prizeIndex * sliceAngle +
      sliceAngle / 2; // Center on the prize

    setRotation(targetRotation);

    // Wait for spin to complete
    setTimeout(async () => {
      setIsSpinning(false);
      setPrize(prizes[prizeIndex]);
      setShowPrize(true);
      setHasSpun(true);
      localStorage.setItem("wheelSpunDate", new Date().toDateString());
      localStorage.setItem("wonPrize", JSON.stringify(prizes[prizeIndex]));

      // Trigger confetti
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
          ],
        });
      } catch (e) {
        console.log("Confetti not available");
      }
    }, 4000);
  };

  const copyCode = () => {
    if (prize) {
      const code = `CYCLE${prize.discount.replace(/[^0-9A-Z]/g, "")}`;
      navigator.clipboard.writeText(code);
      alert(`Coupon code "${code}" copied! Show this at checkout.`);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-shadow"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Gift className="w-7 h-7" />
            </motion.div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !isSpinning && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
              style={{ perspective: 1400 }}
              whileHover={{ rotateX: -5, rotateY: 6 }}
              whileTap={{ rotateX: 0, rotateY: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => !isSpinning && setIsOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition"
                disabled={isSpinning}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 text-yellow-400 mb-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold">LUCKY SPIN</span>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">
                  Spin & Win Amazing Prizes!
                </h2>
                <p className="text-white/60 text-sm mt-2">
                  {hasSpun
                    ? "Come back tomorrow for another spin!"
                    : "One free spin per day. Try your luck!"}
                </p>
              </div>

              {/* Wheel Container */}
              <div className="relative flex justify-center items-center mb-6">
                {/* Pointer */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 z-20 liquid-wave"
                >
                  <div className="w-0 h-0 border-l-15 border-l-transparent border-r-15 border-r-transparent border-t-25 border-t-yellow-400 drop-shadow-lg" />
                </motion.div>

                {/* Wheel */}
                <motion.div
                  animate={{ rotate: rotation }}
                  transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
                  className="relative z-10"
                >
                  <canvas
                    ref={canvasRef}
                    width={280}
                    height={280}
                    className="rounded-full shadow-2xl"
                  />
                </motion.div>

                {/* Gradient Liquid Layers */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{ zIndex: 5 }}
                >
                  {gradientLayers.map((layer, index) => (
                    <motion.div
                      key={layer.gradient + index}
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundImage: layer.gradient,
                        opacity: layer.opacity,
                        mixBlendMode: "screen",
                        filter: "blur(68px)",
                      }}
                      animate={{
                        x: ["-6%", "6%", "-6%"],
                        y: ["-6%", "6%", "-6%"],
                      }}
                      transition={{
                        duration: layer.duration,
                        delay: layer.delay,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10" />
              </div>

              {/* Spin Button */}
              {!showPrize ? (
                <motion.button
                  whileHover={{ scale: hasSpun ? 1 : 1.05 }}
                  whileTap={{ scale: hasSpun ? 1 : 0.95 }}
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpun}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    hasSpun
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : isSpinning
                      ? "bg-yellow-600 text-white cursor-wait"
                      : "bg-linear-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-yellow-500/30"
                  }`}
                >
                  {hasSpun
                    ? "Already Claimed Today"
                    : isSpinning
                    ? "Spinning..."
                    : "🎰 SPIN NOW!"}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
                    <PartyPopper className="w-6 h-6" />
                    <span className="font-bold text-lg">CONGRATULATIONS!</span>
                    <PartyPopper className="w-6 h-6" />
                  </div>
                  <p className="text-white text-xl font-bold mb-4">
                    You won:{" "}
                    <span className="text-yellow-400">{prize?.text}</span>
                  </p>
                  <button
                    onClick={copyCode}
                    className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all"
                  >
                    📋 Copy Coupon Code
                  </button>
                  <p className="text-white/50 text-xs mt-3">
                    Valid for 24 hours. Show code at checkout.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
