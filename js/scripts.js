document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Scroll Initialization
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#smooth-scroll"),
        smooth: true
    });

    // Register GSAP ScrollTrigger with Locomotive Scroll
    gsap.registerPlugin(ScrollTrigger);
    scroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#smooth-scroll").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    // GSAP Animations
    gsap.from(".hero h1", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".hero",
            scroller: "#smooth-scroll",
            start: "top center"
        }
    });

    gsap.from(".about", {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".about",
            scroller: "#smooth-scroll",
            start: "top center"
        }
    });
});

// Mouse movement parallax for the grid
document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX / window.innerWidth) - 0.5;
    const moveY = (e.clientY / window.innerHeight) - 0.5;

    gsap.to("#gridCanvas", {
        x: moveX * 20,
        y: moveY * 20,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Glowing Cursor Effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
