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
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          ...colors.primary,
          DEFAULT: colors.primary.DEFAULT,
          hover: colors.primary[600],
        },
        secondary: {
          ...colors.secondary,
          DEFAULT: colors.secondary.DEFAULT,
        },
        taupe: {
          ...colors.taupe,
          DEFAULT: colors.taupe.DEFAULT,
        },
        offWhite: {
          ...colors.offWhite,
          DEFAULT: colors.offWhite.DEFAULT,
        },
        gray: {
          ...colors.gray,
          DEFAULT: colors.gray.DEFAULT,
        },
        sage: {
          ...colors.sage,
          DEFAULT: colors.sage.DEFAULT,
        },
        slate: {
          ...colors.slate,
          DEFAULT: colors.slate.DEFAULT,
        },
        gold: {
          ...colors.gold,
          DEFAULT: colors.gold.DEFAULT,
        },
        terracota: {
          ...colors.terracota,
          DEFAULT: colors.terracota.DEFAULT,
        },
        bronze: {
          ...colors.bronze,
          DEFAULT: colors.bronze.DEFAULT,
        },
        black: {
          ...colors.black,
          DEFAULT: colors.black.DEFAULT,
        },
        success: {
          ...colors.success,
          DEFAULT: colors.success.DEFAULT,
        },
        warning: {
          ...colors.warning,
          DEFAULT: colors.warning.DEFAULT,
        },
        danger: {
          ...colors.danger,
          DEFAULT: colors.danger.DEFAULT,
        },
        info: {
          ...colors.info,
          DEFAULT: colors.info.DEFAULT,
        },
        background: colors.background,
        surface: colors.surface,
        border: colors.border,
      },

      fontFamily: {
        primary: typography.fonts.primary,
        secondary: typography.fonts.secondary,
        brand: typography.fonts.brand,
      },

      fontSize: {
        xs: typography.sizes.xs,
        sm: typography.sizes.sm,
        base: typography.sizes.base,
        lg: typography.sizes.lg,
        xl: typography.sizes.xl,
        '2xl': typography.sizes['2xl'],
        '3xl': typography.sizes['3xl'],
        '4xl': typography.sizes['4xl'],
        '5xl': typography.sizes['5xl'],
      },

      fontWeight: {
        thin: typography.weights.thin,
        extraLight: typography.weights.extraLight,
        light: typography.weights.light,
        normal: typography.weights.normal,
        medium: typography.weights.medium,
        semibold: typography.weights.semibold,
        bold: typography.weights.bold,
        extrabold: typography.weights.extrabold,
        black: typography.weights.black,
      },

      spacing: spacing,

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

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      backgroundImage: {
        'gradient-primary': shadows.gradients.primary,
        'gradient-gold': shadows.gradients.gold,
        'gradient-warm': shadows.gradients.warm,
        'gradient-sage': shadows.gradients.sage,
        'gradient-offWhite': shadows.gradients.offWhite,
      },
    },
  },

  plugins: [],
};