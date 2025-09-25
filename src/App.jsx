import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    // max-w-6xl mx-auto flex items-center justify-between py-4 px-6
    <main >
      <NavBar />
      <Hero />
    </main>
  );
}

export default App;
