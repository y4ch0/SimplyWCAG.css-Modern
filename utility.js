document.addEventListener("DOMContentLoaded", function () {
    // navbar show/hide
    var navbar_enabled = false;
    document.querySelectorAll("header.gov-mark a.toggler").forEach((element) => {
        element.addEventListener("click", () => {
            if (!document.getElementById("explanation").classList.contains("show")) {
                document.getElementById("explanation").classList.toggle("show");
            } else {
                document.getElementById("explanation").classList.remove("show");
            }
        });
    });
    document.querySelectorAll(".nav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            if (!navbar_enabled) {
                navbar_enabled = true;
                document.getElementById("nav-menu").style.display = "flex";
            } else {
                navbar_enabled = false;
                document.getElementById("nav-menu").style.display = "none";
            }
        });
    });
    // dropdown open/close
    document.body.addEventListener("click", function (event) {
        const toggler = event.target.closest(".toggler");
        if (toggler) {
            event.preventDefault();
            console.log("wykryto toggler - to on kontroluje dropdown");
            const dropdown = toggler.nextElementSibling;
            if (dropdown && dropdown.tagName === "UL") {
                /*if (dropdown.classList.contains("show")) {
                    const keyFrame = new KeyframeEffect(
                        dropdown,
                        [
                            { top: "100%", opacity: "1", transform: "scale(1)" },
                            { top: "calc(100% - 5px)", opacity: "0", transform: "scale(0.97)" },
                        ],
                        {
                            duration: 150,
                            easing: "ease-in-out",
                            direction: "normal",
                        }
                    );
                    const animation = new Animation(keyFrame, document.timeline);
                    animation.play();
                    animation.onfinish = () => dropdown.classList.remove("show");
                }*/
                dropdown.classList.toggle("show");
            }
        } else {
            document.querySelectorAll("ul.show").forEach((dropdown) => {
                /*const keyFrame = new KeyframeEffect(
                    dropdown,
                    [
                        { top: "100%", opacity: "1", transform: "scale(1)" },
                        { top: "calc(100% - 5px)", opacity: "0", transform: "scale(0.97)" },
                    ],
                    {
                        duration: 150,
                        easing: "ease-in-out",
                        direction: "normal",
                    }
                );
                const animation = new Animation(keyFrame, document.timeline);
                animation.play();
                animation.onfinish = () => dropdown.classList.remove("show");*/
                dropdown.classList.remove("show");
            });
        }
    });
    // dialog open/close
    document.querySelectorAll(".dialog-open").forEach((item) => {
        item.addEventListener("click", () => {
            document.getElementById(item.dataset.dialog_id).setAttribute("open", "");
        });
    });
    document.querySelectorAll(".dialog-close").forEach((item) => {
        item.addEventListener("click", () => {
            const dialog = document.getElementById(item.dataset.dialog_id);
            const body = dialog.querySelector(".body");
            const keyFrame = new KeyframeEffect(body, [{ transform: "scale(1)" }, { transform: "scale(0.8)" }], {
                duration: 300,
                easing: "ease",
                direction: "normal",
            });
            const keyFrame1 = new KeyframeEffect(dialog, [{ opacity: "1" }, { opacity: "0" }], {
                duration: 300,
                easing: "ease",
                direction: "normal",
            });

            const animation = new Animation(keyFrame, document.timeline);
            const animation1 = new Animation(keyFrame1, document.timeline);
            animation.play();
            animation1.play();
            animation.onfinish = () => dialog.close();
        });
    });
    // dialog animation after clicking on the background
    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            const body = dialog.querySelector("div.body");
            if (!body.contains(event.target)) {
                const keyFrame = new KeyframeEffect(body, [{ transform: "scale(1)" }, { transform: "scale(0.8)" }], {
                    duration: 300,
                    easing: "ease",
                    direction: "normal",
                });
                const keyFrame1 = new KeyframeEffect(dialog, [{ opacity: "1" }, { opacity: "0" }], {
                    duration: 300,
                    easing: "ease",
                    direction: "normal",
                });

                const animation = new Animation(keyFrame, document.timeline);
                const animation1 = new Animation(keyFrame1, document.timeline);
                animation.play();
                animation1.play();
                animation.onfinish = () => dialog.close();
            }
        });
    });
    // custom tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", function (event) {
        const target = event.target.closest("[title]");
        if (!target) return;

        const titleText = target.getAttribute("title");
        target.removeAttribute("title");
        target.dataset.tooltip = titleText;

        tooltip.textContent = titleText;
        tooltip.style.visibility = "visible";
        positionTooltip(event, target, tooltip);
    });

    document.addEventListener("mousemove", function (event) {
        const target = event.target.closest("[data-tooltip]");
        if (target) {
            positionTooltip(event, target, tooltip);
        }
    });

    document.addEventListener("mouseout", function (event) {
        const target = event.target.closest("[data-tooltip]");
        if (!target) return;

        target.setAttribute("title", target.dataset.tooltip);
        delete target.dataset.tooltip;
        tooltip.style.visibility = "hidden";
    });

    function positionTooltip(event, target, tooltip) {
        const padding = 4;
        const maxWidth = window.innerWidth * 0.95;
        tooltip.style.maxWidth = `${maxWidth}px`;
        tooltip.style.position = "absolute";

        const tooltipRect = tooltip.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        let top = window.scrollY + targetRect.top - tooltipRect.height - padding;
        let left = window.scrollX + targetRect.left + (targetRect.width - tooltipRect.width) / 2;

        if (top < window.scrollY) top = window.scrollY + targetRect.bottom + padding;
        if (left < window.scrollX) left = window.scrollX + padding;
        if (left + tooltipRect.width > window.scrollX + window.innerWidth) {
            left = window.scrollX + window.innerWidth - tooltipRect.width - padding;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    document.querySelectorAll(".card-switch").forEach(function (switcher) {
        const togglers = switcher.querySelectorAll(".togglers .card-toggler");
        const cards = switcher.querySelectorAll(".cards .card");

        function setActiveTab(index) {
            togglers.forEach((toggler, i) => {
                toggler.classList.toggle("current", i === index);
            });
            cards.forEach((card, i) => {
                card.style.display = i === index ? "block" : "none";
            });
        }

        togglers.forEach((toggler, index) => {
            toggler.addEventListener("click", function (event) {
                event.preventDefault();
                setActiveTab(index);
            });
        });

        setActiveTab(0);
    });
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach((slider) => {
        const slidesContainer = slider.querySelector(".slides");
        const slides = slider.querySelectorAll(".slide");
        const prevButton = slider.querySelector(".swipe-left");
        const nextButton = slider.querySelector(".swipe-right");
        let currentIndex = 0;

        let indicators = document.createElement("ol");
        indicators.classList.add("current-slide-indicator");
        slider.appendChild(indicators);

        slides.forEach((_, index) => {
            let dot = document.createElement("li");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSliderPosition();
            });
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll("li");

        function updateSliderPosition() {
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        }

        function updateIndicators() {
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSliderPosition();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
        }

        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);
        updateIndicators();
    });
    document.addEventListener("click", function (event) {
        let target = event.target;

        // Sprawdzenie, czy kliknięty element lub jego rodzic posiada data-href
        while (target && target !== document) {
            let href = target.getAttribute("data-href");
            if (href) {
                window.location.href = href;
                break;
            }
            target = target.parentElement;
        }
    });
});
