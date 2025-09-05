import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Our Services"
            paragraph="We offer a wide range of services to help your business grow and succeed."
            center
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>


        </div>
      </section>
    </>
  );
};

export default Features;
