import LPNavbar from "../LPNavbar";
import Hero from "../Hero";
import AppPreview from "../AppPreview";
import FeatureHighlight from "../FeatureHighlight";
import HowItWorks from "../HowItWorks";
import Testimonials from "../Testimonials";
import CallToAction from "../CallToAction";
import Footer from "../Footer";

const LandingPage = () => {
  return (
    <>
      <LPNavbar />
      <Hero />
      <AppPreview />
      <FeatureHighlight />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default LandingPage;
