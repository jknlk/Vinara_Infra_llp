import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  ScrollTrigger.defaults({ start: "top 75%", toggleActions: "play none none none" });
}

export { gsap, ScrollTrigger, SplitText };
