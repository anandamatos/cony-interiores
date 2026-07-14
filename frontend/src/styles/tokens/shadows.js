// ============================================
// TOKENS DE SOMBRAS - CONY INTERIORES
// Sistema de profundidade e volume
// ============================================

export const shadows = {
  none: 'none',

  // Escala principal (fiel ao HTML de referencia)
  sm: '0 1px 4px rgba(75, 58, 46, 0.06)',
  md: '0 4px 16px rgba(75, 58, 46, 0.08)',
  lg: '0 8px 32px rgba(75, 58, 46, 0.12)',
  xl: '0 16px 48px rgba(75, 58, 46, 0.16)',

  // Camada de superficie discreta observada em cards do prototipo
  surface: '0 2px 8px rgba(0, 0, 0, 0.04)',
  surfaceHover: '0 6px 18px rgba(0, 0, 0, 0.07)',

  // Semanticos para o DS
  card: '0 2px 8px rgba(0, 0, 0, 0.04)',
  cardHover: '0 4px 16px rgba(75, 58, 46, 0.08)',
  sidebar: '2px 0 16px rgba(75, 58, 46, 0.04)',
  header: '0 2px 8px rgba(75, 58, 46, 0.03)',
  button: '0 1px 4px rgba(75, 58, 46, 0.06)',
  buttonHover: '0 4px 16px rgba(75, 58, 46, 0.08)',
  focusGold: '0 0 0 4px rgba(201, 168, 106, 0.15)',

  // Efeitos para sobreposicoes
  elevated: '0 8px 32px rgba(75, 58, 46, 0.12)',
  dropdown: '0 12px 32px rgba(75, 58, 46, 0.14)',
  modal: '0 24px 48px rgba(75, 58, 46, 0.18)',
  inset: 'inset 0 1px 2px rgba(75, 58, 46, 0.08)',

  // Sombras com cores de acento
  gold: '0 4px 16px rgba(201, 168, 106, 0.15)',
  terracota: '0 4px 16px rgba(181, 106, 74, 0.12)',
  sage: '0 4px 16px rgba(141, 154, 186, 0.12)',
  primary: '0 4px 16px rgba(75, 58, 46, 0.12)',

  // Efeitos de volume para cards específicos
  // Stat cards com cores diferentes (como no protótipo)
  statPrimary: '0 8px 16px rgba(201, 168, 106, 0.15), 0 2px 4px rgba(201, 168, 106, 0.05)',
  statSage: '0 8px 16px rgba(141, 154, 186, 0.12), 0 2px 4px rgba(141, 154, 186, 0.04)',
  statGold: '0 8px 16px rgba(201, 168, 106, 0.12), 0 2px 4px rgba(201, 168, 106, 0.04)',
  statTerracota: '0 8px 16px rgba(181, 106, 74, 0.12), 0 2px 4px rgba(181, 106, 74, 0.04)',
};