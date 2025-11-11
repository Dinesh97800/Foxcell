import { useRouter } from "next/navigation";
import React from "react";

interface FancyButtonProps {
  children: React.ReactNode;
  isFullWidth?: string;
  action?: string | (() => void);
  color?: string;
  textColor?: string;
}

const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  isFullWidth = "",
  action = "button",
  color = "#fe8900",
  textColor = "#ffffff",
}) => {
  const buttonType: "button" | "submit" | "reset" =
    action === "submit" ? "submit" : action === "reset" ? "reset" : "button";
  const router = useRouter();
  console.log("Button action:", action);
  const handleClick = () => {
    if (!action) return;

    if (typeof action === "function") {
      action();
    } else if (action.startsWith("http")) {
      // external link
      window.location.href = action;
    } else {
      // internal Next.js route
      // router.push(action);
    }
  };

  return (
    <button
      className={`relative px-8 py-3 rounded-lg font-semibold overflow-hidden group ${isFullWidth}`}
      type={buttonType}
      onClick={handleClick}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {/* Sliding halves */}
      <span className="absolute inset-0 flex">
        {/* Left half */}
        <span className="w-1/2 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
        {/* Right half */}
        <span className="w-1/2 bg-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
      </span>

      {/* Text always above layers */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default FancyButton;
