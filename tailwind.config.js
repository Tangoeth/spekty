// Tailwind v4 moves configuration to CSS by default.
// Retaining this file empty or minimal if specific JS config is needed, 
// but for this project we are using CSS variables in index.css.
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
