"use client"

import * as React from "react"
import type { TooltipProps } from "recharts"
import { cn } from "@/lib/utils"
import { Tooltip as RechartsTooltip } from "recharts"

export type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
    icon?: React.ComponentType<{ className?: string }>
  }
}

const ChartContext = React.createContext<ChartConfig | null>(null)

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, style, ...props }, ref) => {
    const cssVars: Record<string, string> = {}

    for (const [key, value] of Object.entries(config)) {
      cssVars[`--color-${key}`] = value.color ?? "hsl(var(--chart-1))"
    }

    return (
      <ChartContext.Provider value={config}>
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          style={{ ...cssVars, ...style }}
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

export type ChartTooltipContentProps = Omit<
  TooltipProps<number, string>,
  "content"
> & {
  className?: string
  indicator?: "dot" | "line"
  valueFormatter?: (value: number | string) => string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      label,
      className,
      indicator = "dot",
      valueFormatter,
      ...props
    },
    ref
  ) => {
    const config = React.useContext(ChartContext)

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-2 rounded-lg border bg-background/95 p-3 text-xs shadow-lg",
          className
        )}
        {...props}
      >
        {label ? (
          <div className="text-sm font-medium text-foreground">{label}</div>
        ) : null}

        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? "value")
          const itemConfig = config?.[key]
          const color =
            item.color ?? item.stroke ?? `var(--color-${key})`
          const formattedValue = valueFormatter
            ? valueFormatter(item.value ?? 0)
            : String(item.value ?? "")

          return (
            <div key={key} className="flex items-center gap-2">
              <span
                className={cn(
                  indicator === "line"
                    ? "h-0.5 w-4"
                    : "h-2.5 w-2.5 rounded-full"
                )}
                style={{ backgroundColor: color, borderColor: color }}
              />
              <span className="flex-1 text-muted-foreground">
                {itemConfig?.label ?? item.name ?? key}
              </span>
              <span className="font-medium text-foreground">
                {formattedValue}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltip = (props: TooltipProps<number, string>) => (
  <RechartsTooltip
    wrapperStyle={{ outline: "none" }}
    cursor={{ fillOpacity: 0.08 }}
    {...props}
  />
)

export { ChartContainer, ChartTooltip, ChartTooltipContent }
