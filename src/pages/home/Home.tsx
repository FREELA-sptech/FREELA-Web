import AboutUs from "./components/AboutUs/AboutUs";
import Banner from "./components/Banner/Banner";
import ClientBanner from "./components/ClientBanner/ClientBanner";
import FreelanceBanner from "./components/FreelanceBanner/FreelanceBanner";

function Home() {
  return (
    <>
      <Banner />
      <AboutUs />
      <ClientBanner />
      <FreelanceBanner />
    </>
  );
}

export default Home
