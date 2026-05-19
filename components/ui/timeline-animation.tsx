import { motion } from "framer-motion";
import React, { RefObject } from "react";
import { cn } from "../../lib/utils";

interface TimelineContentProps {
  children?: React.ReactNode;
  className?: string;
  customVariants?: any;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement>;
  as?: any;
  [key: string]: any;
}

export const TimelineContent = ({ 
    children, 
    className, 
    customVariants, 
    animationNum, 
    timelineRef, 
    as = "div",
    ...props
}: TimelineContentProps) => {
    // Cast to any to avoid type complexity with generic motion components
    const Component = (motion as any)[as] || motion.div;
    
    return (
        <Component
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={customVariants}
            custom={animationNum}
            className={className}
            {...props}
        >
            {children}
        </Component>
    );
};