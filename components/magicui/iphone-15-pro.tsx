"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  src?: string
  videoSrc?: string
}

export function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  className,
  ...props
}: Iphone15ProProps) {
  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="fill-black dark:fill-gray-900"
        />
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          className="fill-gray-600 dark:fill-gray-500"
        />
        <path
          d="M1 234C0.447715 234 0 234.448 0 235V253C0 253.552 0.447715 254 1 254H3V234H1Z"
          className="fill-gray-600 dark:fill-gray-500"
        />
        <path
          d="M1 283C0.447715 283 0 283.448 0 284V302C0 302.552 0.447715 303 1 303H3V283H1Z"
          className="fill-gray-600 dark:fill-gray-500"
        />
        <path
          d="M430 253H432C432.552 253 433 252.552 433 252V186C433 185.448 432.552 185 432 185H430V253Z"
          className="fill-gray-600 dark:fill-gray-500"
        />
      </svg>
      <div
        className="absolute rounded-[40px] shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.1)]"
        style={{
          width: `${width - 36}px`,
          height: `${height - 36}px`,
          top: "18px",
          left: "18px",
        }}
      >
        <div className="absolute inset-x-0 top-0 mx-auto h-7 w-40 rounded-b-2xl bg-black dark:bg-gray-900" />
        <div className="absolute inset-x-0 top-1 mx-auto h-1 w-16 rounded-full bg-gray-800 dark:bg-gray-700" />
        {videoSrc && (
          <video
            className="h-full w-full rounded-[40px] object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {src && !videoSrc && (
          <img
            src={src}
            alt="iPhone screen"
            className="h-full w-full rounded-[40px] object-cover"
          />
        )}
      </div>
    </div>
  )
}