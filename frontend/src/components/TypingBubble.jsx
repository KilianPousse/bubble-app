import { useEffect, useState } from "react";

function TypingBubble({ text = "", speed = 50, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      className={`relative bg-white text-slate-900 p-4 rounded-2xl shadow-lg inline-block ${className}`}
    >
      <p className="text-lg font-medium font-mono whitespace-pre-wrap">
        {displayedText}
      </p>
      <span className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></span>
    </div>
  );
}

export default TypingBubble;
