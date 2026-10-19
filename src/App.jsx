import MetalCursor from "./components/MetalCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Schedule from "./components/Schedule";
import Voices from "./components/Voices";
import Register from "./components/Register";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <MetalCursor />
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Schedule />
        <Voices />
        <Register />
      </main>
      <Footer />
    </>
  );
}
