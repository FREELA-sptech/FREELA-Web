import AboutUs from "./components/AboutUs/AboutUs";
import Banner from "./components/Banner/Banner";
import ClientBanner from "./components/ClientBanner/ClientBanner";
import Footer from "../../shared/components/Footer/Footer";
import FreelanceBanner from "./components/FreelanceBanner/FreelanceBanner";
import MobileBanner from "./components/MobileBanner/MobileBanner";
import ServiceBanner from "./components/ServiceBanner/ServiceBanner";

function Home() {
  return (
    <>
      <Banner />
      <AboutUs />
      <ClientBanner />
      <FreelanceBanner />
      <ServiceBanner />
      <MobileBanner />
      <Footer />
    </>
  );
}

export default Home
