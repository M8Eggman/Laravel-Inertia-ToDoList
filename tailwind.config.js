import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/js/**/*.jsx",
        "./resources/js/**/*.js",
        "./resources/views/**/*.blade.php",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Rubik", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                h1: "clamp(3rem, 10vw, 4rem)",
                h2: "clamp(2.25rem, 6vw, 3rem)",
                h3: "clamp(1.875rem, 4.5vw, 2.25rem)",
                h4: "clamp(1.5rem, 3.5vw, 1.875rem)",
                h5: "clamp(1.25rem, 2.5vw, 1.5rem)",
                h6: "clamp(1rem, 2vw, 1.25rem)",
                "xl-custom": "clamp(1.25rem, 2.5vw, 1.5rem)",
                "l-custom": "clamp(1.125rem, 2.2vw, 1.375rem)",
                "m-custom": "clamp(1rem, 2vw, 1.125rem)",
                "sm-custom": "clamp(0.875rem, 1.5vw, 1rem)",
            },
        },
    },

    plugins: [forms],
};
