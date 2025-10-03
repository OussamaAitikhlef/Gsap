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
  const isScrollingDownRef = useRef(isScrollingDown);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade-in animation on mount
      gsap.set(navRef.current, { autoAlpha: 1 });
      gsap.from(navRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power4.out",
      });

      // Staggered entrance for nav links
      const items = linksRef.current
        ? linksRef.current.querySelectorAll("li")
        : [];

      gsap.from(items, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        stagger: { each: 0.15, from: "start" },
        delay: 0.7,
      });

      // Backdrop blur animation with ScrollTrigger
      gsap
        .timeline({
          scrollTrigger: {
            trigger: navRef.current,
            start: "top top",
            end: "top top-=50",
            toggleActions: "play reverse play reverse",
            scrub: 0.3,
          },
        })
        .fromTo(
          navRef.current,
          {
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
          {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(116, 149, 101, 0.253)",
            duration: 0.6,
            ease: "power1.out",
          },
        );

      // Simple scroll handler for show/hide
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > prevScrollY.current;
        const hideNavbar = currentScrollY > 300;

        setIsScrollingDown(scrollingDown);
        isScrollingDownRef.current = scrollingDown;

        // Only hide/show navbar, no padding changes
        if (hideNavbar) {
          gsap.to(navRef.current, {
            yPercent: scrollingDown ? -100 : 0,
            ease: "power2.out",
            duration: 0.2, // Much faster
          });
        } else {
          // Always show when near top
          gsap.to(navRef.current, {
            yPercent: 0,
            ease: "power2.out",
            duration: 0.2,
          });
        }

        prevScrollY.current = currentScrollY;
      };

      // Reveal on hover/touch near the top of the viewport
      const TOP_THRESHOLD = 60; // px from top that will reveal the nav
      const hoverActive = { current: false };

      const handleMouseMove = (e) => {
        if (e.clientY <= TOP_THRESHOLD) {
          if (!hoverActive.current) {
            hoverActive.current = true;
            // show nav
            gsap.to(navRef.current, {
              yPercent: 0,
              ease: "power2.out",
              duration: 0.18,
            });
          }
        } else {
          if (hoverActive.current) {
            hoverActive.current = false;
            // If user is scrolled down far and scrolling down, hide the nav again
            if (window.scrollY > 300 && isScrollingDownRef.current) {
              gsap.to(navRef.current, {
                yPercent: -100,
                ease: "power2.out",
                duration: 0.18,
              });
            }
          }
        }
      };

      const handleTouchStart = (e) => {
        const touchY = e.touches && e.touches[0] ? e.touches[0].clientY : 9999;
        if (touchY <= TOP_THRESHOLD) {
          gsap.to(navRef.current, {
            yPercent: 0,
            ease: "power2.out",
            duration: 0.18,
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchstart", handleTouchStart);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchstart", handleTouchStart);
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
        ease: "expo.inOut",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
      style={{
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        backgroundColor: "transparent",
        isolation: "isolate",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a
          href="#main-content"
          className="skip-to-main-content sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-black focus:p-4"
        >
          Skip to main content
        </a>

        <a
          href="#home"
          className="flex items-center gap-2 text-white transition-colors hover:text-purple-300"
          onClick={handleLogoClick}
          aria-label="Liquorium - Back to top"
        >
          <img
            src="/images/logo.png"
            alt=""
            className="h-8 w-auto"
            aria-hidden="true"
          />
          <p className="font-semibold">Liquorium</p>
        </a>

        <ul
          ref={linksRef}
          className="flex items-center gap-7"
          role="menubar"
          aria-label="Main menu"
        >
          {navLinks.map((link) => (
            <li key={link.id} className="overflow-hidden" role="none">
              <a
                href={`#${link.id}`}
                className="group relative text-xs text-white transition-colors duration-200 hover:text-purple-300"
                role="menuitem"
                aria-current={
                  window.location.hash === `#${link.id}` ? "page" : undefined
                }
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
