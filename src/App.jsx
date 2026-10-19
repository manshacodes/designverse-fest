import useSmoothScroll from "./lib/useSmoothScroll";
import MetalCursor from "./components/MetalCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Schedule from "./components/Schedule";
import Voices from "./components/Voices";
import Admission from "./components/Admission";
import Footer from "./components/Footer";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <MetalCursor />
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Schedule />
        <Voices />
        <Admission />
      </main>
      <Footer />
    </>
  );
}
