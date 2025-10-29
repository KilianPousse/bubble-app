import { motion } from "framer-motion";

function TypingDots({
  color = "#000",
  size = 10
}) {
  const padding = Math.max(4, size * 0.8);
  const gap = Math.max(2, size * 0.3);

  return (
    <div 
      className="relative text-slate-900 inline-flex items-center rounded-lg"
      style={{ 
        padding: `${padding}px ${padding * 2}px`,
        gap: `${gap * 1.5}px`
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ 
            backgroundColor: color,
            width: size,
            height: size
          }}
          animate={{
            y: [size * 0.1, -size * 0.5, size * 0.1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export default TypingDots;