import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#about h2", {
      type: "words",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5",
      );

    // Advanced complex reveal animations for grids
    const topImgs = gsap.utils.toArray(".top-grid img");
    const bottomImgs = gsap.utils.toArray(".bottom-grid img");
    const topContainers = gsap.utils.toArray(".top-grid > div");
    const bottomContainers = gsap.utils.toArray(".bottom-grid > div");

    // Set initial states with complex clip-path shapes and effects
    gsap.set(topImgs, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Start as a point
      scale: 1.2,
      rotation: 5,
      opacity: 0,
      filter: "blur(10px) brightness(0.3)",
      willChange: "clip-path, transform, opacity, filter",
    });

    gsap.set(bottomImgs, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Start as a point
      scale: 1.2,
      rotation: -5,
      opacity: 0,
      filter: "blur(10px) brightness(0.3)",
      willChange: "clip-path, transform, opacity, filter",
    });

    // Set container initial states for additional effects
    gsap.set(topContainers, {
      y: 50,
      opacity: 0,
      scale: 0.9,
    });

    gsap.set(bottomContainers, {
      y: -50,
      opacity: 0,
      scale: 0.9,
    });

    // Top grid complex reveal animation
    const topTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".top-grid",
        start: "top 85%",
        once: true,
      },
    });

    topTimeline
      // First: Container reveal with scale and movement
      .to(topContainers, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.6,
          from: "start",
        },
      })
      // Second: Image clip-path morphing from point to circle to rectangle
      .to(
        topImgs,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            amount: 0.8,
            from: "start",
          },
        },
        "-=0.4",
      )
      // Third: Image appearance with blur and brightness
      .to(
        topImgs,
        {
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 0.8,
          ease: "power2.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "-=0.8",
      )
      // Fourth: Scale and rotation refinement
      .to(
        topImgs,
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            amount: 0.4,
            from: "start",
          },
        },
        "-=0.6",
      );

    // Bottom grid complex reveal animation (different pattern)
    const bottomTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".bottom-grid",
        start: "top 85%",
        once: true,
      },
    });

    bottomTimeline
      // First: Container reveal with different movement pattern
      .to(bottomContainers, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.6,
          from: "end",
        },
      })
      // Second: Different clip-path morphing pattern (diamond to rectangle)
      .to(
        bottomImgs,
        {
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          duration: 0.6,
          ease: "power2.out",
          stagger: {
            amount: 0.4,
            from: "end",
          },
        },
        "-=0.4",
      )
      .to(bottomImgs, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.4,
          from: "end",
        },
      })
      // Third: Image appearance with different timing
      .to(
        bottomImgs,
        {
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 0.8,
          ease: "power2.out",
          stagger: {
            amount: 0.6,
            from: "end",
          },
        },
        "-=0.6",
      )
      // Fourth: Scale and rotation with different easing
      .to(
        bottomImgs,
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.4,
            from: "end",
          },
        },
        "-=0.4",
      );

    // Add subtle parallax effect on scroll
    gsap.to(topImgs, {
      y: -20,
      scrollTrigger: {
        trigger: ".top-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(bottomImgs, {
      y: 20,
      scrollTrigger: {
        trigger: ".bottom-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Add hover effects for interactivity
    topContainers.forEach((container, index) => {
      const img = container.querySelector("img");

      container.addEventListener("mouseenter", () => {
        gsap.to(img, {
          scale: 1.05,
          rotation: 2,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      container.addEventListener("mouseleave", () => {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    bottomContainers.forEach((container, index) => {
      const img = container.querySelector("img");

      container.addEventListener("mouseenter", () => {
        gsap.to(img, {
          scale: 1.05,
          rotation: -2,
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      container.addEventListener("mouseleave", () => {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  });

  return (
    <div id="about" className="p-3">
      <div className="mb-16 px-5 md:px-0">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className="text-xl font-bold md:text-3xl">
                <span>4.5</span>/5
              </p>
              <p className="text-white-100 text-sm">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};
export default OurStory;
