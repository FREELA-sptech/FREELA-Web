import "./style.scss"

import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";

function Home() {
    return (
        <div className="container">
            <Banner />
            <AboutUs />
        </div>
    );
}

export default Home