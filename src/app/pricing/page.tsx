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
        pageName="Pricing Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <Pricing />
    </>
  );
};

export default PricingPage;
