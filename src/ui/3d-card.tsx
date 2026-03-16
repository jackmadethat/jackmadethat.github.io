import { cn } from "../../lib/utils";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";

// Context for hover state
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// ---------------------------
// Card Container
// ---------------------------
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  // Rotation state
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const rotateY = (e.clientX - left - width / 2) / 25;
    const rotateX = -(e.clientY - top - height / 2) / 25;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{ perspective: "650px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative", className)}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// ---------------------------
// Card Body
// ---------------------------
export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "h-96 w-96",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

// ---------------------------
// Card Item (for 3D layers)
// ---------------------------
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn(
        "w-fit transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ---------------------------
// Hook
// ---------------------------
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  return context;
};