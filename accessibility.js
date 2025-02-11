document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;
    const body = document.body;
    const nav = document.querySelector("nav");
    const header = document.querySelector(".accessibility-tools"); // Wyłączony z modyfikacji

    // Pobieramy wszystkie elementy oraz priorytetowe
    const allElements = document.querySelectorAll("*:not(.accessibility-tools)"); // Wyklucz header
    const priorityElements = document.querySelectorAll(
        "button, a, input, select, textarea, label, .dropdown > ul, summary, .header-primary, .header-secondary, .card p, .card h4, .details-mark, span.spinner"
    );

    // Obsługa zmiany rozmiaru czcionki
    const fontSizeMap = {
        "at-fs-1": "100%",
        "at-fs-2": "120%",
        "at-fs-3": "135%",
    };

    // Obsługa trybów kontrastu
    const contrastMap = {
        "at-c-1": { background: "", color: "", outline: "" },
        "at-c-2": { background: "#000", color: "#0f0", outline: "#0f0" },
        "at-c-3": { background: "#ff0", color: "#000", outline: "#000" },
        "at-c-4": { background: "#000", color: "#ff0", outline: "#ff0" },
        "at-c-5": { background: "#000", color: "#fff", outline: "#fff" },
    };

    document.querySelector(".accessibility-tools").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const classList = event.target.classList;

            // Obsługa zmiany rozmiaru czcionki
            Object.keys(fontSizeMap).forEach((cls) => {
                if (classList.contains(cls)) {
                    root.style.setProperty("font-size", fontSizeMap[cls], "important");
                }
            });

            // Obsługa zmiany kontrastu
            Object.keys(contrastMap).forEach((cls) => {
                if (classList.contains(cls)) {
                    const contrast = contrastMap[cls];

                    // Zmieniamy tło (oprócz headera accessibility-tools)
                    if (contrast.background) {
                        body.style.setProperty("background-color", contrast.background, "important");
                        header.style.setProperty("background-color", contrast.background, "important");
                        nav.style.setProperty("background-color", contrast.background, "important");
                    } else {
                        body.style.removeProperty("background-color");
                        nav.style.removeProperty("background-color");
                        header.style.removeProperty("background-color");
                    }

                    // Zmieniamy kolor tekstu (oprócz headera accessibility-tools)
                    if (contrast.color) {
                        body.style.setProperty("color", contrast.color, "important");
                        header.style.setProperty("color", contrast.color, "important");
                        nav.style.setProperty("color", contrast.color, "important");

                        // Ustawiamy border-color
                        allElements.forEach((el) => {
                            el.style.setProperty("border-color", contrast.color, "important");
                        });

                        // Priorytetowe elementy
                        priorityElements.forEach((el) => {
                            el.style.setProperty("color", contrast.color, "important");
                            el.style.setProperty("border-color", contrast.color, "important");
                            el.style.setProperty("background-color", contrast.background, "important");
                        });

                        // Outline tylko dla elementów, które już go miały
                        allElements.forEach((el) => {
                            const computedStyle = window.getComputedStyle(el);
                            if (computedStyle.outlineStyle !== "none") {
                                el.style.setProperty("outline-color", contrast.outline, "important");
                            }
                        });
                    } else {
                        body.style.removeProperty("color");
                        nav.style.removeProperty("color");
                        header.style.removeProperty("color");

                        // Resetujemy border-color
                        allElements.forEach((el) => {
                            el.style.removeProperty("border-color");
                        });

                        // Resetujemy priorytetowe elementy
                        priorityElements.forEach((el) => {
                            el.style.removeProperty("color");
                            el.style.removeProperty("border-color");
                            el.style.removeProperty("background-color");
                        });

                        // Resetujemy outline
                        allElements.forEach((el) => {
                            el.style.removeProperty("outline-color");
                        });
                    }
                }
            });
        }
    });
});
