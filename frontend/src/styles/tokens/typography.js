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
    secondary: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    brand: '"Syncopate", "Montserrat", sans-serif',
    display: '"Syncopate", "Montserrat", sans-serif',
  },

  // ==========================================
  // ESCALA TIPOGRÁFICA
  // ==========================================
  sizes: {
    xs: "0.625rem",
    sm: "0.75rem",
    base: "0.875rem",
    lg: "1rem",
    xl: "1.125rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.25rem",
    "5xl": "4.8rem",
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
      letterSpacing: "-0.03em",
      lineHeight: "1.1",
    },
    h2: {
      fontFamily: "primary",
      size: "2xl",
      weight: "semibold",
      letterSpacing: "-0.03em",
      lineHeight: "1.25",
    },
    h3: {
      fontFamily: "primary",
      size: "xl",
      weight: "semibold",
      letterSpacing: "0",
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
      size: "lg",
      weight: "normal",
      letterSpacing: "0",
      lineHeight: "1.7",
    },
    body2: {
      fontFamily: "secondary",
      size: "base",
      weight: "normal",
      letterSpacing: "0",
      lineHeight: "1.6",
    },
    caption: {
      fontFamily: "display",
      size: "sm",
      weight: "normal",
      letterSpacing: "0.15em",
      lineHeight: "1.5",
    },
  },

  // ==========================================
  // BREAKPOINTS RESPONSIVOS (para h1)
  // ==========================================
  responsive: {
    h1: {
      mobile: "3xl",
      tablet: "4xl",
      desktop: "5xl",
    },
  },
};
