import Hero from "../../components/hero/Hero";
import LandingIllustration from "../../assets/6509982.jpg"
import Banner from "../../components/banner/Banner";
function LandingPage(){


    return (

        <>
            <Hero/>
            <Banner/>
            <img src={LandingIllustration} alt="e-commerce" width={"40%"} style={{minWidth: '300px', marginBottom: '130px'}}/>
        </>


    )



}




export default LandingPage;