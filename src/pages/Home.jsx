import Hero from "../components/Hero";
import FeatureCollection from "../components/FeatureCollection";
import Collections from "../components/Collections";
import FeatureSelector from "../components/Feactures";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureCollection />
      <Collections />
      <FeatureSelector />
      <Form />
      <Footer />
    </>
  );
}
