import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Page | Free Next.js Template for Startup and SaaS",
  description: "This is Pricing Page for Startup Nextjs Template",
  // other metadata
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Services & Pricing"
        description="Choose a plan that fits your needs. Our flexible pricing options are designed to help your business grow."
      />

      <Pricing />
    </>
  );
};

export default PricingPage;
