import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import OurStory from "./components/OurStory";
import TargetCursor from "./components/TargetCursor";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <main>
      <TargetCursor />
      <NavBar />
      <Hero />
      <Cocktails />
      <OurStory />
    </main>
  );
}

export default App;
