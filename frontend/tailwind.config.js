import { colors } from './src/styles/tokens/colors.js';
import { typography } from './src/styles/tokens/typography.js';
import { spacing } from './src/styles/tokens/spacing.js';
import { shadows } from './src/styles/tokens/shadows.js';
import { borders } from './src/styles/tokens/borders.js';
import { animations } from './src/styles/tokens/animations.js';

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
        secondary: colors.secondary,
        taupe: colors.taupe,
        offWhite: colors.offWhite,
        gray: colors.gray,
        sage: colors.sage,
        slate: colors.slate,
        gold: colors.gold,
        terracota: colors.terracota,
        bronze: colors.bronze,
        black: colors.black,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
        info: colors.info,
        background: colors.background,
        surface: colors.surface,
        border: colors.border,
      },

      fontFamily: {
        primary: typography.fonts.primary,
        secondary: typography.fonts.secondary,
        brand: typography.fonts.brand,
      },

      fontSize: typography.sizes,
      fontWeight: typography.weights,

      spacing: spacing,

      borderRadius: {
        ...borders.radius,
        xs: borders.radius.xs,
        sm: borders.radius.sm,
        DEFAULT: borders.radius.base,
        md: borders.radius.md,
        lg: borders.radius.lg,
        xl: borders.radius.xl,
        '2xl': borders.radius['2xl'],
        '3xl': borders.radius['3xl'],
        card: borders.radius.card,
        pill: borders.radius.pill,
        full: borders.radius.full,
      },

      borderWidth: {
        ...borders.width,
      },

      boxShadow: {
        none: shadows.none,
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
        surface: shadows.surface,
        'surface-hover': shadows.surfaceHover,
        card: shadows.card,
        'card-hover': shadows.cardHover,
        elevated: shadows.elevated,
        dropdown: shadows.dropdown,
        modal: shadows.modal,
        sidebar: shadows.sidebar,
        header: shadows.header,
        button: shadows.button,
        'button-hover': shadows.buttonHover,
        'focus-gold': shadows.focusGold,
        inset: shadows.inset,
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
        ...animations.easing,
      },

      transitionDuration: {
        instant: animations.duration.instant,
        fast: animations.duration.fast,
        normal: animations.duration.normal,
        slow: animations.duration.slow,
        slower: animations.duration.slower,
      },

      keyframes: {
        ...animations.keyframes,
      },

      animation: {
        'fade-in': `fadeIn ${animations.duration.slow} ${animations.easing.easeOut} both`,
        'slide-up': `slideUp ${animations.duration.slow} ${animations.easing.easeOut} both`,
        'slide-down': `slideDown ${animations.duration.slow} ${animations.easing.easeOut} both`,
        'spring-in': `springIn ${animations.duration.normal} ${animations.easing.spring} both`,
        pulse: `pulse ${animations.duration.slower} ${animations.easing.easeInOut} infinite`,
        float: `float ${animations.duration.slower} ${animations.easing.easeInOut} infinite`,
        glow: `glow ${animations.duration.slower} ${animations.easing.easeInOut} infinite`,
        'count-up': `countUp ${animations.duration.slow} ${animations.easing.easeOut} both`,
        'expand-width': `expandWidth ${animations.duration.slow} ${animations.easing.spring} both`,
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #C9A86A 0%, #A8968B 50%, #4B3A2E 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D9C7B1 0%, #C9A86A 100%)',
        'gradient-warm': 'linear-gradient(135deg, #4B3A2E 0%, #B56A4A 100%)',
        'gradient-sage': 'linear-gradient(135deg, #8D9ABA 0%, #465057 100%)',
        'gradient-offWhite': 'linear-gradient(135deg, #F6F3EF 0%, #E6E2DD 100%)',
      },
    },
  },

  plugins: [],
};