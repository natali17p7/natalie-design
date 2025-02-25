import type { Config } from "tailwindcss"

export default {
   content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   plugins: [require("daisyui")], // eslint-disable-line @typescript-eslint/no-require-imports
   daisyui: {
     themes: ["black"],
     darkTheme: "black",
     base: true,
     styled: true,
     utils: true,
   },
   theme: {
     fontFamily: {
       sans: ['Inter', 'sans-serif'],
       mono: [
         'Monaco',
         'ui-monospace',
         'SFMono-Regular',
         'Menlo',
         'Consolas',
         'Liberation Mono',
         'Courier New',
         'monospace'
       ]
     },
     extend: {
       colors: {
         background: "var(--background)",
         foreground: "var(--foreground)",
       },
     }
   }
 } satisfies Config
