// ============================================
// TOKENS DE ANIMAÇÃO - CONY INTERIORES
// Sistema de animações para transições e interações
// ============================================

export const animations = {
  // ==========================================
  // DURAÇÕES
  // ==========================================
  duration: {
    instant: "0.05s",
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.5s",
    slower: "0.8s",
    verySlow: "1.2s",
  },

  // ==========================================
  // EASING FUNCTIONS
  // ==========================================
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    bouncy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // ==========================================
  // ANIMAÇÕES PREDEFINIDAS
  // ==========================================
  animations: {
    fadeIn: {
      name: "fadeIn",
      duration: "normal",
      easing: "easeOut",
      fillMode: "both",
    },
    slideUp: {
      name: "slideUp",
      duration: "slow",
      easing: "easeOut",
      fillMode: "both",
    },
    slideDown: {
      name: "slideDown",
      duration: "slow",
      easing: "easeOut",
      fillMode: "both",
    },
    springIn: {
      name: "springIn",
      duration: "normal",
      easing: "spring",
      fillMode: "both",
    },
    pulse: {
      name: "pulse",
      duration: "slower",
      easing: "easeInOut",
      fillMode: "both",
      iterationCount: "infinite",
    },
    shimmer: {
      name: "shimmer",
      duration: "verySlow",
      easing: "easeInOut",
      fillMode: "forwards",
      iterationCount: "infinite",
    },
    float: {
      name: "float",
      duration: "verySlow",
      easing: "easeInOut",
      fillMode: "both",
      iterationCount: "infinite",
    },
    glow: {
      name: "glow",
      duration: "slower",
      easing: "easeInOut",
      fillMode: "both",
      iterationCount: "infinite",
    },
    countUp: {
      name: "countUp",
      duration: "slow",
      easing: "easeOut",
      fillMode: "both",
    },
    expandWidth: {
      name: "expandWidth",
      duration: "slow",
      easing: "spring",
      fillMode: "both",
    },
  },

  // ==========================================
  // TRANSFORMAÇÕES COMUNS
  // ==========================================
  transforms: {
    scale: "scale(1.05)",
    scaleSmall: "scale(0.95)",
    translateUp: "translateY(-4px)",
    translateDown: "translateY(4px)",
    rotate: "rotate(180deg)",
    rotateSmall: "rotate(-4deg)",
  },

  // ==========================================
  // KEYFRAMES (para serem usados no CSS)
  // ==========================================
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    slideDown: {
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    springIn: {
      "0%": { opacity: 0, transform: "scale(0.92)" },
      "60%": { transform: "scale(1.04)" },
      "100%": { opacity: 1, transform: "scale(1)" },
    },
    pulse: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.6 },
    },
    shimmer: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-6px)" },
    },
    glow: {
      "0%, 100%": { boxShadow: "0 0 8px rgba(201, 168, 106, 0.15)" },
      "50%": { boxShadow: "0 0 24px rgba(201, 168, 106, 0.35)" },
    },
    countUp: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    expandWidth: {
      from: { transform: "scaleX(0)" },
      to: { transform: "scaleX(1)" },
    },
  },
};
