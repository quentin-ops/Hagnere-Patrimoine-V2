import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("", className)} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

function BreadcrumbLink({ className, asChild, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      className={cn("transition-colors hover:text-foreground", className)}
      {...(props as React.ComponentProps<"a">)}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li"> & { children?: React.ReactNode }) {
  return (
    <li role="presentation" aria-hidden className={cn("[&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Plus</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
