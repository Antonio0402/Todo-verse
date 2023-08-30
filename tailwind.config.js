/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin.js';
import defaultTheme from "tailwindcss/defaultTheme.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'xl': '1440px',
      },
      colors: {
        background: "#dff6f6",
        text: "#727290",
        secondary: "#d8d8d8",
        edit: "#86b6b6",
        "edit-hover": "#b6dfba",
        "edit-active": "#8db591",
        delete: "#ffafa3",
        "delete-hover": "#ffc9c1",
        create: "#6c7394",
        "signout-text": "#fff",
        "signout-hover": "#af5e5e",
        "signout-active": "#af5151",
        input: "#e6e8ec",
        danger: "#ff3232",
      },
      spacing: {
        'size-0': 'clamp(0.83rem, 0.90rem + -0.32vw, 0.67rem)',
        'base': 'clamp(1.00rem, 1.00rem + 0.00vw, 1.00rem)',
        'size-1': 'clamp(1.20rem, 1.08rem + 0.59vw, 1.50rem)',
        'size-2': 'clamp(1.44rem, 1.12rem + 1.58vw, 2.25rem)',
        'size-3': 'clamp(1.73rem, 1.09rem + 3.21vw, 3.38rem)',
        'size-4': 'clamp(2.07rem, 0.91rem + 5.83vw, 5.06rem)',
        'size-5': 'clamp(2.49rem, 0.50rem + 9.96vw, 7.59rem)'
      },
      fontSize: {
        'size-0': 'clamp(0.83rem, 0.90rem + -0.32vw, 0.67rem)',
        'base': 'clamp(1.00rem, 1.00rem + 0.00vw, 1.00rem)',
        'size-1': 'clamp(1.20rem, 1.08rem + 0.59vw, 1.50rem)',
        'size-2': 'clamp(1.44rem, 1.12rem + 1.58vw, 2.25rem)',
        'size-3': 'clamp(1.73rem, 1.09rem + 3.21vw, 3.38rem)',
        'size-4': 'clamp(2.07rem, 0.91rem + 5.83vw, 5.06rem)',
        'size-5': 'clamp(2.49rem, 0.50rem + 9.96vw, 7.59rem)'
      },
      fontFamily: {
        'sans': ['Trebuchet MS', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, _theme }) {
      /* Modern reset: https://piccalil.li/blog/a-modern-css-reset/ */
      addBase({
        /* Set core root defaults */
        'html:focus-within': {
          scollBehavior: 'smooth'
        },
        /* Set core body defaults */
        'body': {
          minHeight: '100vh',
          textRendering: 'optimizeSpeed',
        },
        /* A elements that don't have a class get default styles */
        'a:not[class]': {
          textDecorationSkipInk: 'auto',
        }
      })
    })
  ],
}

