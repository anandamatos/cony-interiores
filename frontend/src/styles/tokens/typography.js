// ============================================
// TOKENS DE TIPOGRAFIA - CONY INTERIORES
// Sistema tipográfico validado
// ============================================

export const typography = {
  // ==========================================
  // FAMÍLIAS DE FONTES
  // ==========================================
  fonts: {
    primary: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    brand: '"ITC Avant Garde", "Montserrat", sans-serif',
  },

  // ==========================================
  // ESCALA TIPOGRÁFICA
  // ==========================================
  sizes: {
    xs: "0.75rem", // 12px - Legenda
    sm: "0.875rem", // 14px - Corpo 2
    base: "1rem", // 16px - Corpo 1
    lg: "1.125rem", // 18px - H4
    xl: "1.25rem", // 20px - H3
    "2xl": "1.5rem", // 24px - H2
    "3xl": "1.875rem", // 30px - H1 (mobile)
    "4xl": "2.25rem", // 36px - H1 (desktop)
    "5xl": "3rem", // 48px - Títulos hero
  },

  // ==========================================
  // PESOS
  // ==========================================
  weights: {
    thin: "100",
    extraLight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // ==========================================
  // HIERARQUIA TIPOGRÁFICA
  // ==========================================
  hierarchy: {
    h1: {
      fontFamily: "primary",
      size: "4xl",
      weight: "bold",
      letterSpacing: "-0.02em",
      lineHeight: "1.2",
    },
    h2: {
      fontFamily: "primary",
      size: "2xl",
      weight: "semibold",
      letterSpacing: "-0.01em",
      lineHeight: "1.3",
    },
    h3: {
      fontFamily: "primary",
      size: "xl",
      weight: "semibold",
      letterSpacing: "-0.01em",
      lineHeight: "1.4",
    },
    h4: {
      fontFamily: "primary",
      size: "lg",
      weight: "semibold",
      letterSpacing: "0",
      lineHeight: "1.4",
    },
    body1: {
      fontFamily: "secondary",
      size: "base",
      weight: "normal",
      letterSpacing: "0",
      lineHeight: "1.7",
    },
    body2: {
      fontFamily: "secondary",
      size: "sm",
      weight: "normal",
      letterSpacing: "0",
      lineHeight: "1.6",
    },
    caption: {
      fontFamily: "secondary",
      size: "xs",
      weight: "normal",
      letterSpacing: "0.3px",
      lineHeight: "1.5",
    },
  },

  // ==========================================
  // BREAKPOINTS RESPONSIVOS (para h1)
  // ==========================================
  responsive: {
    h1: {
      mobile: "3xl", // 30px
      tablet: "4xl", // 36px
      desktop: "4xl", // 36px
    },
  },
};
