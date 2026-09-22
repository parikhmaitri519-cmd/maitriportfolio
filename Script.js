/* =========================================
   PARIKH MAITRI — PERSONAL PORTFOLIO
   Simple JavaScript for beginners
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navigationItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        // Open / close mobile menu
        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        // Close menu after selecting a navigation link
        navigationItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Close menu when tapping outside the navigation
        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedMenuButton &&
                navLinks.classList.contains("active")
            ) {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });

    }


    /* =========================================
       2. ACTIVE NAVIGATION HIGHLIGHTING
    ========================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationItems.forEach(function (link) {

            const target =
                link.getAttribute("href");

            const isActive =
                target === "#" + currentSection;

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

                // Visual active state
                link.style.color = "var(--accent)";

            } else {

                link.removeAttribute("aria-current");

                link.style.color = "";

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================================
       3. SIMPLE SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-card, " +
        ".education-card, " +
        ".interest-card, " +
        ".strength-card, " +
        ".goal-card, " +
        ".contact-card"
    );


    // If IntersectionObserver is supported,
    // reveal elements as they enter the screen.
    if ("IntersectionObserver" in window) {

        revealElements.forEach(function (element) {

            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

        });


        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    }


    /* =========================================
       4. ESC KEY CLOSES MOBILE MENU
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.focus();

            }

        }

    });


    /* =========================================
       5. KEEP MOBILE MENU CLOSED ON RESIZE
    ========================================= */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth >= 850 &&
            navLinks &&
            menuToggle
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

});
