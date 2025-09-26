"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        .meteor-effect {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.6);
          animation: meteor 5s linear infinite;
          opacity: 0;
        }
        .meteor-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, white, transparent);
        }
      `}</style>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className="meteor-effect"
          style={{
            top: Math.floor(Math.random() * 100) - 10 + "%",
            right: Math.floor(Math.random() * 100) - 10 + "%",
            animationDelay: (idx * 0.1) + Math.random() + "s",
            animationDuration: Math.floor(Math.random() * 3 + 2) + "s",
          }}
        />
      ))}
    </>
  );
};