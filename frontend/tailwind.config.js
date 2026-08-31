/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'temple-primary': '#253d46',      // Krishna Deep Teal / Slate Navy
        'temple-accent': '#ae4427',       // Sacred Terracotta Rust / Saffron Ochre
        'temple-gold': '#d4af37',         // Temple Divine Gold
        'temple-gold-hover': '#b89327',
        'temple-light': '#f8f5f0',        // Warm Soft Linen Background
        'temple-dark': '#17262c',         // Deep Obsidian Background
        'temple-charcoal': '#1f2937',     // Text Charcoal
        'temple-orange': '#ae4427',       // Backward compatibility fallback
        'temple-blue': '#253d46',         // Backward compatibility fallback
      },
      fontFamily: {
        lora: ['"Noto Serif Bengali"', 'Lora', 'Georgia', 'serif'],
        poppins: ['"Hind Siliguri"', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'temple': '0 10px 30px rgba(37, 61, 70, 0.12)',
        'temple-hover': '0 16px 40px rgba(37, 61, 70, 0.22)',
      },
    },
  },
  plugins: [],
}
