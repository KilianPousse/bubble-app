import TypingDots from "./TypingDots";

function TypingDotsBubble({
  bubbleColor = "#fff",
  dotColor = "#000",
  size = 10,
}) {
  const bubblePadding = Math.max(8, size * 0.8); 
  const gap = Math.max(4, size * 0.3); 
  const arrowSize = Math.max(4, size * 1.0);
  const arrowOffset = -arrowSize;

  return (
    <div
      className="relative rounded-2xl shadow-lg inline-flex items-center"
      style={{ 
        backgroundColor: bubbleColor,
        padding: `${bubblePadding}px ${bubblePadding * 1.5}px`,
        gap: `${gap}px`
      }}
    >
      <TypingDots color={dotColor} size={size} />
      
      <span
        className="absolute w-0 h-0 border-transparent"
        style={{ 
          left: `${bubblePadding * 1.75}px`,
          bottom: `${arrowOffset}px`,
          borderLeftWidth: `${arrowSize}px`,
          borderRightWidth: `${arrowSize}px`,
          borderTopWidth: `${arrowSize}px`,
          borderTopColor: bubbleColor,
        }}
      ></span>
    </div>
  );
}

export default TypingDotsBubble;