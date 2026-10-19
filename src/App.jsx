import MetalCursor from "./components/MetalCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
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
        <Register />
      </main>
      <Footer />
    </>
  );
}
