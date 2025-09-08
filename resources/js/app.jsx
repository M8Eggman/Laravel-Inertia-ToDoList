import "./bootstrap";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { route } from "ziggy-js";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    title: (title) =>
        `${title} - ${import.meta.env.VITE_APP_NAME || "Laravel"}`,
});

InertiaProgress.init({
    delay: 250,
    color: "#4B5563",
    includeCSS: true,
    showSpinner: true,
});

window.route = (name, params, absolute) =>
    route(name, params, absolute, window.Ziggy);
