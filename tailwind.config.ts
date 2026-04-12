import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"GT Canon"', 'Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
