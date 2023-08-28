/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui:{
    themes:[
      {
        defaultTheme:{
          'primary':'#1D5D9B',
          'secondary':'#75C2F6',
          'accent':'#F4D160',
          'neutral':'#FBEEAC',
          'info':'#0079FF',
          'success':'#5D9C59',
          'error':'#DF2E38',
          'snow': '#DDF7E3'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}

