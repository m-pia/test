import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shimmer': 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.25) 50%, transparent 60%)',
      },
      keyframes: {
        'background-pan': {
          'from': { backgroundPosition: '0% center' },
          'to': { backgroundPosition: '200% center' },
        },
        shimmer: {
          'from': { backgroundPosition: '-200% 0' },
          'to': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'background-pan': 'background-pan 1.5s ease-out forwards',
        'shimmer': 'shimmer 3s infinite linear',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
export default config
