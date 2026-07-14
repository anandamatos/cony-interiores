import { colors } from './src/styles/tokens/colors.js';
import { typography } from './src/styles/tokens/typography.js';
import { spacing } from './src/styles/tokens/spacing.js';
import { shadows } from './src/styles/tokens/shadows.js';
import { borders } from './src/styles/tokens/borders.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      // ... outras configurações ...

      borderRadius: {
        ...borders.radius,
        sm: borders.radius.sm,
        DEFAULT: borders.radius.base,
        md: borders.radius.md,
        lg: borders.radius.lg,
        xl: borders.radius.xl,
        '2xl': borders.radius['2xl'],
        '3xl': borders.radius['3xl'],
        full: borders.radius.full,
      },

      borderWidth: {
        ...borders.width,
      },

      boxShadow: {
        ...shadows,
        sm: shadows.sm,
        base: shadows.base,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
        card: shadows.card,
        'card-hover': shadows.cardHover,
        elevated: shadows.elevated,
        dropdown: shadows.dropdown,
        modal: shadows.modal,
        sidebar: shadows.sidebar,
        header: shadows.header,
        gold: shadows.gold,
        terracota: shadows.terracota,
        sage: shadows.sage,
        primary: shadows.primary,
        'stat-primary': shadows.statPrimary,
        'stat-sage': shadows.statSage,
        'stat-gold': shadows.statGold,
        'stat-terracota': shadows.statTerracota,
      },
    },
  },

  plugins: [],
};