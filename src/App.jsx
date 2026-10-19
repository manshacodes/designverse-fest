import useSmoothScroll from "./lib/useSmoothScroll";
import { DecoDefs } from "./components/Deco";
import MetalCursor from "./components/MetalCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import ScheduleMap from "./components/ScheduleMap";
import Voices from "./components/Voices";
import Admission from "./components/Admission";
import Footer from "./components/Footer";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <DecoDefs />
      <MetalCursor />
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <ScheduleMap />
        <Voices />
        <Admission />
      </main>
      <Footer />
    </>
  );
}
