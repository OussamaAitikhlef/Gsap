import { useEffect, useRef, useState } from "react";
import { navLinks } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function NavBar() {
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade-in animation on mount
      gsap.set(navRef.current, { autoAlpha: 1 });
      gsap.from(navRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.5,
        ease: 'power4.out',
      });

      // Staggered entrance for nav links
      const items = linksRef.current
        ? linksRef.current.querySelectorAll("li")
        : [];

      gsap.from(items, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        stagger: { each: 0.15, from: "start" },
        delay: 0.7,
      });

      // Backdrop blur animation with ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: navRef.current,
          start: "top top",
          end: "top top-=50",
          toggleActions: "play reverse play reverse",
          scrub: 0.3,
        }
      }).fromTo(navRef.current, 
        { 
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(0, 0, 0, 0)"
        },
        {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(116, 149, 101, 0.253)",
          duration: 0.6,
          ease: "power1.out",
        }
      );

      // Simple scroll handler for show/hide
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > prevScrollY.current;
        const hideNavbar = currentScrollY > 300;

        setIsScrollingDown(scrollingDown);

        // Only hide/show navbar, no padding changes
        if (hideNavbar) {
          gsap.to(navRef.current, {
            yPercent: scrollingDown ? -100 : 0,
            ease: 'power2.out',
            duration: 0.2, // Much faster
          });
        } else {
          // Always show when near top
          gsap.to(navRef.current, {
            yPercent: 0,
            ease: 'power2.out',
            duration: 0.2,
          });
        }

        prevScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        gsap.killTweensOf(navRef.current);
      };
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault();
    
    // Check if already at top
    if (window.scrollY !== 0) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0, autoKill: false },
        ease: 'expo.inOut',
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
      style={{
        // Initial CSS for backdrop-filter support
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)', // Safari support
        backgroundColor: 'transparent',
        // Ensure proper layering
        isolation: 'isolate',
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          onClick={handleLogoClick}
        >
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
          <p className="font-semibold">Liquorium</p>
        </a>

        <ul
          ref={linksRef}
          className="flex items-center gap-7"
        >
          {navLinks.map((link) => (
            <li key={link.id} className="overflow-hidden">
              <a 
                href={`#${link.id}`} 
                className="text-sm text-white hover:text-purple-300 transition-colors duration-200 relative group"
              >
                <p className="relative z-10">{link.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;