import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'kusumi-pink': '#BE8080',
                'gray-5F': '#5F5F5F',
                'gray-D9': '#D9D9D9',
            },
        },
    },
    colors: {
        'kusumi-pink': '#BE8080',
    },
    plugins: [],
};
export default config;
