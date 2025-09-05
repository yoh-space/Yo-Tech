"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const packages = [
    {
      packageName: "Portfolio",
      price: "14,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "Perfect for personal portfolios and small projects.",
      features: [
        { text: "Domain name (1 Year)", status: "active" },
        { text: "Hosting (1 Year)", status: "active" },
        { text: "Strategy & Consulting", status: "active" },
        { text: "Creative Web Design", status: "active" },
        { text: "Responsive Website", status: "active" },
        { text: "User Experience", status: "active" },
        { text: "SEO", status: "active" },
        { text: "1 Month Maintenance", status: "active" },
        { text: "All free Plugins Installed", status: "inactive" },
        { text: "10 Post Featured Image", status: "inactive" },
        { text: "Web Page Advertisement", status: "inactive" },
        { text: "Installing Sub-domains", status: "inactive" },
        { text: "Fascinated Features", status: "inactive" },
        { text: "Marketing Features", status: "inactive" },
      ],
    },
    {
      packageName: "Blog",
      price: "19,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "Ideal for bloggers and content creators.",
      features: [
        { text: "Domain name (1 Year)", status: "active" },
        { text: "Hosting (1 Year)", status: "active" },
        { text: "Strategy & Consulting", status: "active" },
        { text: "Creative Web Design", status: "active" },
        { text: "Responsive Web Design", status: "active" },
        { text: "User Experience", status: "active" },
        { text: "SEO", status: "active" },
        { text: "2 Month Maintenance", status: "active" },
        { text: "All free Plugins Installed", status: "active" },
        { text: "5 Post Featured Image", status: "active" },
        { text: "Web Page Advertisement", status: "active" },
        { text: "Installing Sub-domains", status: "inactive" },
        { text: "Fascinated Features", status: "inactive" },
        { text: "Marketing Features", status: "inactive" },
      ],
    },
    {
      packageName: "Business",
      price: "29,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "For enterprises needing a robust and scalable website.",
      features: [
        { text: "Domain name (1 Year)", status: "active" },
        { text: "Hosting (1 Year)", status: "active" },
        { text: "Strategy & Consulting", status: "active" },
        { text: "Creative Web Design", status: "active" },
        { text: "Responsive Web Design", status: "active" },
        { text: "User Experience", status: "active" },
        { text: "SEO", status: "active" },
        { text: "3 Month Maintenance", status: "active" },
        { text: "All free Plugins Installed", status: "active" },
        { text: "10 Post Featured Image", status: "active" },
        { text: "Web Page Advertisement", status: "active" },
        { text: "Installing Sub-domain", status: "active" },
        { text: "Fascinated Features", status: "active" },
        { text: "Database Customization", status: "active" },
      ],
    },
  ];

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="Choose the plan that suits your needs. Our packages include everything to get your website online and performing."
          center
          width="665px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <PricingBox
              key={index}
              packageName={pkg.packageName}
              price={pkg.price}
              duration={pkg.duration}
              subtitle={pkg.subtitle}
            >
              <div className={`${pkg.bgColor} p-6 rounded-lg`}>
                {pkg.features.map((feature, i) => (
                  <OfferList
                    key={i}
                    text={feature.text}
                    status={feature.status as "active" | "inactive"}
                  />
                ))}
                <button className="mt-4 w-full rounded bg-blue-600 p-3 text-white font-semibold hover:bg-blue-700 transition">
                  START: {pkg.price} {pkg.duration}
                </button>
              </div>
            </PricingBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;