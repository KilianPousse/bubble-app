import { motion } from "framer-motion";

function TypingDotsBubble({
  bubbleColor = "#fff",
  dotColor = "#000",
  size = "md", // "sm" | "md" | "lg"
}) {
  // Définition des tailles selon la prop
  const sizeMap = {
    sm: {
      bubblePadding: "px-2 py-1.5",
      dotSize: "w-1.5 h-1.5",
      arrowOffset: "left-2 top-4 border-l-[4px] border-r-[4px] border-t-[6px]",
    },
    md: {
      bubblePadding: "px-4 py-2.5",
      dotSize: "w-2 h-2",
      arrowOffset: "left-3.5 top-7 border-l-[5px] border-r-[5px] border-t-[6px]",
    },
    lg: {
      bubblePadding: "px-6 py-4",
      dotSize: "w-3 h-3",
      arrowOffset: "left-4 border-l-[10px] border-r-[10px] border-t-[10px]",
    },
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative text-slate-900 rounded-2xl shadow-lg inline-flex items-center gap-1 ${current.bubblePadding}`}
      style={{ backgroundColor: bubbleColor }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`${current.dotSize} rounded-full`}
          style={{ backgroundColor: dotColor }}
          animate={{
            y: [0, -2, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <span
        className={`absolute -bottom-2 ${current.arrowOffset} w-0 h-0 border-transparent`}
        style={{ borderTopColor: bubbleColor }}
      ></span>
    </div>
  );
}

export default TypingDotsBubble;
