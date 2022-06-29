const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                ar: 'Scheherazade New'
            },
            colors:{
                primary:{
                    'light': '#B5CFB6',
                    'normal': '#749A77',
                    'dark': '#3D5437'
                },
                secondary:{
                    'light': '#ECECEC',
                    'normal': '#8E8E8E',
                    'dark' : '#373737'
                },
                body: '#F5F4EF',
                ui: '#FEFEFE',
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
