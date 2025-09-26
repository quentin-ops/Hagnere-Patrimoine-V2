"use client"

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Header3Advanced } from "@/components/header3-advanced";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { DevS3Uploader } from "@/components/dev-s3-uploader";
import { Footer9 } from "@/components/footer9";
import { NavbarTop } from "@/components/navbar-top";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBackoffice = pathname?.startsWith('/backoffice');

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isBackoffice && <NavbarTop />}
      <div className={!isBackoffice ? "pt-[4.5rem]" : ""}>
        {!isBackoffice && <SiteHeader />}
        {!isBackoffice && <Header3Advanced />}
        <main className="flex-1">
          {!isBackoffice && <SiteBreadcrumb />}
          {children}
        </main>
      </div>
      {!isBackoffice && <Footer9 />}
      <DevS3Uploader />
    </div>
  );
}