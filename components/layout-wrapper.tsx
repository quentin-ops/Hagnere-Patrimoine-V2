"use client"

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SecondHeader } from "@/components/second-header";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { DevS3Uploader } from "@/components/dev-s3-uploader";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBackoffice = pathname?.startsWith('/backoffice');

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isBackoffice && <SiteHeader />}
      {!isBackoffice && <SecondHeader />}
      <main className="flex-1">
        {!isBackoffice && <SiteBreadcrumb />}
        {children}
      </main>
      <DevS3Uploader />
    </div>
  );
}