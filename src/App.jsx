import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import TheBar from "./components/TheBar";
import OurStory from "./components/OurStory";
import TheCraft from "./components/TheCraft";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import TargetCursor from "./components/TargetCursor";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <>
      <TargetCursor />
      <header>
        <NavBar />
      </header>
      <main id="main-content">
        <Hero />
        <TheBar />
        <OurStory />
        <TheCraft />
        <Menu />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}export default App;
