/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [
    // Import plugins using ESM format
    (await import("@tailwindcss/typography")).default,
    (await import("daisyui")).default,
  ],
  daisyui: {
    themes: [
      {
        light: {
          // Define the light theme without importing DaisyUI themes file
          primary: "#4f46e5",
          secondary: "#818cf8",
          accent: "#c084fc",
          "primary-focus": "#4338ca",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "base-content": "#1f2937",
        },
      },
      "dark",
      "corporate",
      "winter",
      "lofi",
    ],
  },
};
