const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
				heading: ['Teko', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				white: '#ffffff',
				eerie_black: '#1C1C1C',
				yolk_yellow: '#FFC145',
				flaming_red: '#ED2C2C',
				steel_blue: '#358188',
				gunmetal: '#20282C',
				chicken_orange: '#F7901E',
				eminence: '#6C3082',
				jungle_green: '#49A078'
			}
		}
	},
	plugins: []
};
