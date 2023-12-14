/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  colors: {
    blue: "#3294F8",
    baseTitle: "#E7EDF4",
    baseSubtitle: "#C4D4E3",
    baseText: "#AFC2D4",
    baseSpan: "#7B96B2",
    baseLabel: "#3A536B",
    baseBorder: "#1C2F41",
    basePost: "#112131",
    baseProfile: "#0B1B2B",
    baseBackground: "#071422",
    baseInput: "#040F1A",

    green300: "#00B37E",
    green500: "#00875F",
    green700: "#015F43",
  },
  extend: {
    boxShadow: {
      shadowProfile: "0px 2px 28px 0px rgba(0, 0, 0, 0.20);",
    },
  },
};
export const plugins = [];
