import Hero from "../components/Hero";
import FeatureCollection from "../components/FeatureCollection";
import Collections from "../components/Collections";
import FeatureSelector from "../components/Feactures";
import Form from "../components/Form";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCollection />\
      <Collections />
      <FeatureSelector />
      <Form />
    </>
  );
}
