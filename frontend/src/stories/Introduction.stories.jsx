import React from 'react';
import {
  Sparkles,
  Palette,
  Component,
  LayoutDashboard,
  ClipboardList,
  Users,
  DollarSign,
  SunMedium,
  Zap,
  Layers,
  MonitorSmartphone,
  Search,
  Bell,
  HelpCircle,
  Plus,
  BadgeCheck,
  Gem,
  SwatchBook,
  BookOpen,
  PanelLeft,
  Laptop,
  ShieldCheck,
  Sparkle,
  Layers3,
  Gauge,
  Settings,
  LogOut,
} from 'lucide-react';

export default {
  title: 'Introdução/Bem-vindo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Design System da Cony Interiores - Referência visual e técnica para construir interfaces consistentes, acessíveis e alinhadas com o produto.',
      },
    },
  },
};

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ============================================
          HEADER - TOPBAR FIXO
          ============================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 border-b border-[#E8E3D9] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-4 py-[18px] flex-wrap">
          {/* Brand - idêntico ao protótipo */}
          <a className="inline-flex items-center gap-3" href="#inicio">
            <span className="w-11 h-11 bg-[#E8E3D9] border border-[rgba(112,56,36,0.15)] rounded-[3px] grid place-items-center p-1.5 transition-transform duration-300 hover:scale-105 hover:-rotate-2">
              <svg viewBox="0 0 60 90" className="w-full h-full">
                <polyline points="6,20 54,10" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="6,32 54,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="54,32 6,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="6,70 54,80" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <strong className="block font-['Syncopate'] text-[19px] tracking-[0.3em] uppercase text-[#703824]">Cony</strong>
              <span className="block font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#903839] -mt-0.5">Interiores</span>
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-2 flex-wrap justify-end" aria-label="Navegação principal">
            <a href="#marca" className="px-4 py-3 text-[14px] font-['Syncopate'] tracking-[0.15em] uppercase text-[#8C7568] rounded-[3px] hover:bg-[rgba(222,187,164,0.25)] hover:text-[#703824] transition-all hover:-translate-y-0.5">Marca</a>
            <a href="#tokens" className="px-4 py-3 text-[14px] font-['Syncopate'] tracking-[0.15em] uppercase text-[#8C7568] rounded-[3px] hover:bg-[rgba(222,187,164,0.25)] hover:text-[#703824] transition-all hover:-translate-y-0.5">Tokens</a>
            <a href="#componentes" className="px-4 py-3 text-[14px] font-['Syncopate'] tracking-[0.15em] uppercase text-[#8C7568] rounded-[3px] hover:bg-[rgba(222,187,164,0.25)] hover:text-[#703824] transition-all hover:-translate-y-0.5">Componentes</a>
            <a href="#shell" className="px-4 py-3 text-[14px] font-['Syncopate'] tracking-[0.15em] uppercase text-[#8C7568] rounded-[3px] hover:bg-[rgba(222,187,164,0.25)] hover:text-[#703824] transition-all hover:-translate-y-0.5">Shell</a>
          </nav>
        </div>
      </header>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <main className="pt-[88px]">

        {/* ============================================
            HERO - SECÇÃO PRINCIPAL
            ============================================ */}
        <section className="py-16 max-w-7xl mx-auto px-8" id="inicio">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Coluna esquerda - conteúdo principal */}
            <div className="lg:col-span-3">
              {/* Eyebrow - CORRIGIDO: mais branco, tamanho correto */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Referência oficial do dashboard
              </span>

              {/* Título - Syncopate com peso e espaçamento corretos */}
              <h1 className="font-['Syncopate'] text-[clamp(2.75rem,5vw,4.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#703824] mt-6 max-w-[12ch]">
                Manual direto para manter o dashboard Cony consistente.
              </h1>

              {/* Texto - Montserrat com line-height 1.7 */}
              <p className="font-['Montserrat'] text-lg leading-[1.7] text-[rgba(75,58,46,0.8)] mt-5 max-w-[58ch]">
                Este documento traduz o que está em tela no protótipo: tokens, estrutura, componentes,
                estados e textos de interface usados no dashboard operacional.
              </p>

              {/* Botões - Tamanho px-6 py-3 com gap-2 */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#tokens" className="inline-flex items-center gap-2 px-6 py-3 bg-[#703824] text-[#F8F5F0] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] hover:bg-[#8B4A2E] transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                  <Palette className="w-4 h-4" />
                  Explorar tokens
                </a>
                <a href="#componentes" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[#703824] border border-[#BFB3A6] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] hover:bg-[#F8F5F0] transition-all hover:-translate-y-0.5">
                  <Component className="w-4 h-4" />
                  Ver biblioteca
                </a>
                <a href="#shell" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4] text-[#703824] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] shadow-sm hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  Abrir shell
                </a>
              </div>

              {/* Nota - com ícone Lucide */}
              <p className="text-sm text-[#8C7568] mt-5 flex items-center gap-2">
                <Sparkle className="w-3.5 h-3.5" />
                Minimalista, sofisticada, acolhedora e contemporânea.
              </p>
            </div>

            {/* Painel lateral - Snapshot do DS */}
            <aside className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm sticky top-[104px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-['Montserrat'] text-xl font-semibold text-[#703824]">Snapshot do DS</h3>
                  <p className="text-sm text-[#8C7568] mt-1">Checklist visual para manter novas telas alinhadas.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">
                  <BadgeCheck className="w-3 h-3" />
                  2.0.0
                </span>
              </div>

              {/* Princípios - com ícones Lucide */}
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Brand first: toda interface deve refletir a identidade da Cony.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Uso exclusivo dos tokens oficiais para cor, tipografia, borda, sombra e motion.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Componentes consistentes, discretos e fáceis de reaplicar entre páginas.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Textos de interface curtos, objetivos e coerentes com os fluxos do dashboard.</span>
                </li>
              </ul>

              {/* Mini Stats - idêntico ao protótipo */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-3 rounded-[3px] bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                  <strong className="block font-['Montserrat'] text-2xl text-[#703824]">4</strong>
                  <span className="text-xs text-[#8C7568]">cards de estatística base</span>
                </div>
                <div className="p-3 rounded-[3px] bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                  <strong className="block font-['Montserrat'] text-2xl text-[#703824]">3</strong>
                  <span className="text-xs text-[#8C7568]">gradientes oficiais</span>
                </div>
                <div className="p-3 rounded-[3px] bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                  <strong className="block font-['Montserrat'] text-2xl text-[#703824]">2</strong>
                  <span className="text-xs text-[#8C7568]">gráficos principais</span>
                </div>
                <div className="p-3 rounded-[3px] bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                  <strong className="block font-['Montserrat'] text-2xl text-[#703824]">3</strong>
                  <span className="text-xs text-[#8C7568]">blocos operacionais</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ============================================
            MARCA - SECÇÃO DE MARCA
            ============================================ */}
        <section className="py-16 max-w-7xl mx-auto px-8" id="marca">
          <div className="flex justify-between items-end gap-5 flex-wrap mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <Gem className="w-3.5 h-3.5" />
                Marca
              </span>
              <h2 className="font-['Montserrat'] text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[#703824] mt-4">
                Direção visual para interfaces que respiram elegância e conforto.
              </h2>
            </div>
            <p className="max-w-[56ch] font-['Montserrat'] text-[#8C7568] leading-[1.7]">
              A interface combina menos ruído visual, mais respiro, materiais claros,
              contrastes quentes e CTAs discretos para leitura rápida da operação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Voz da marca</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-2 leading-[1.7]">Minimalista, sofisticada, acolhedora e contemporânea. A interface deve parecer curada, não genérica.</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 rounded-full bg-[rgba(75,58,46,0.1)] text-[#703824] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Elegância</span>
                <span className="px-3 py-1 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Sofisticação</span>
                <span className="px-3 py-1 rounded-full bg-[#F0ECE7] text-[#7C7267] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Conforto</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Diretrizes de UI</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2 font-['Montserrat'] text-sm text-[rgba(75,58,46,0.84)] leading-[1.7]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Superfícies claras com profundidade sutil e bordas suaves.</span>
                </li>
                <li className="flex items-start gap-2 font-['Montserrat'] text-sm text-[rgba(75,58,46,0.84)] leading-[1.7]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Uso generoso de espaço em branco para valorizar conteúdo e hierarquia.</span>
                </li>
                <li className="flex items-start gap-2 font-['Montserrat'] text-sm text-[rgba(75,58,46,0.84)] leading-[1.7]">
                  <span className="text-[#C2996A] mt-0.5">✓</span>
                  <span>Chamadas de ação presentes, mas sem agressividade cromática.</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Imagética e atmosfera</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-2 leading-[1.7]">Ambientes amplos, luz natural e materiais orgânicos inspiram a escolha de tons quentes, superfícies off-white e gradientes discretos.</p>
              <div className="mt-4 inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white/84 border border-[#E8E3D9] font-['Montserrat'] text-sm">
                <SunMedium className="w-4 h-4 text-[#C2996A]" />
                Luz natural e materiais naturais
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKENS - CORES E TIPOGRAFIA
            ============================================ */}
        <section className="py-16 max-w-7xl mx-auto px-8" id="tokens">
          <div className="flex justify-between items-end gap-5 flex-wrap mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <SwatchBook className="w-3.5 h-3.5" />
                Tokens
              </span>
              <h2 className="font-['Montserrat'] text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[#703824] mt-4">
                Cor, tipografia, ritmo e motion usados no dashboard.
              </h2>
            </div>
            <p className="max-w-[56ch] font-['Montserrat'] text-[#8C7568] leading-[1.7]">
              Estes tokens são os mesmos do protótipo: paleta quente, espaçamento previsível,
              sombras leves, responsividade estável e motion funcional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Paleta de Cores */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md overflow-hidden shadow-sm">
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Paleta central</h3>
                  <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1">Tons base para identidade, suporte e destaque da Cony.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">cores oficiais</span>
              </div>
              <div className="grid grid-cols-5 gap-px bg-[rgba(230,227,221,0.92)] border-t border-[rgba(230,227,221,0.92)]">
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5" style={{ background: '#E8E3D9' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#703824]">Primary 50</strong>
                  <span className="text-[10px] opacity-86 text-[#703824]">#E8E3D9</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5" style={{ background: '#DEBBA4' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#703824]">Secondary 400</strong>
                  <span className="text-[10px] opacity-86 text-[#703824]">#DEBBA4</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#8C7568' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Taupe 500</strong>
                  <span className="text-[10px] opacity-86">#8C7568</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#C2996A' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Gold 500</strong>
                  <span className="text-[10px] opacity-86">#C2996A</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#703824' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Primary 500</strong>
                  <span className="text-[10px] opacity-86">#703824</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5" style={{ background: '#F8F5F0' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#703824]">Background</strong>
                  <span className="text-[10px] opacity-86 text-[#703824]">#F8F5F0</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5" style={{ background: '#E8E3D9' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#703824]">Border</strong>
                  <span className="text-[10px] opacity-86 text-[#703824]">#E8E3D9</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#7C8A6E' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Sage 500</strong>
                  <span className="text-[10px] opacity-86">#7C8A6E</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#903839' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Terracota</strong>
                  <span className="text-[10px] opacity-86">#903839</span>
                </div>
                <div className="min-h-[128px] p-4 flex flex-col justify-end gap-0.5 text-white" style={{ background: '#5C6B63' }}>
                  <strong className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">Slate 500</strong>
                  <span className="text-[10px] opacity-86">#5C6B63</span>
                </div>
              </div>
            </div>

            {/* Tipografia */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Tipografia</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Syncopate conduz rótulos e marca. Montserrat sustenta títulos e texto corrido.</p>
              <div className="space-y-4 mt-4">
                <div className="pb-4 border-b border-[#E8E3D9]">
                  <div className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">h1 · Montserrat bold · 36px</div>
                  <div className="font-['Montserrat'] text-[36px] font-bold tracking-[-0.03em] text-[#703824] leading-[1.2]">Elegância silenciosa em camadas claras.</div>
                </div>
                <div className="pb-4 border-b border-[#E8E3D9]">
                  <div className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">h2 · Montserrat semibold · 24px</div>
                  <div className="font-['Montserrat'] text-2xl font-semibold tracking-[-0.03em] text-[#703824] leading-[1.3]">Escala editorial para dashboards e narrativas.</div>
                </div>
                <div className="pb-4 border-b border-[#E8E3D9]">
                  <div className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">body1 · Montserrat regular · 16px</div>
                  <div className="font-['Montserrat'] text-base font-normal leading-[1.7] text-[rgba(75,58,46,0.85)]">Interfaces limpas, consistentes e acessíveis, com leitura confortável e ritmo previsível.</div>
                </div>
                <div>
                  <div className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">caption · Montserrat regular · 12px</div>
                  <div className="font-['Montserrat'] text-xs font-normal leading-[1.5] text-[#A8968B]">Metadados, apoios textuais e informações complementares.</div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================
              ESPAÇAMENTO E MOTION
              ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            {/* Espaçamento */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Espaçamento</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Escala baseada em múltiplos de 4px.</p>
              <div className="space-y-3 mt-4">
                {[
                  { label: '4', value: '16px', width: 'w-4' },
                  { label: '6', value: '24px', width: 'w-6' },
                  { label: '8', value: '32px', width: 'w-8' },
                  { label: '12', value: '48px', width: 'w-12' },
                  { label: '16', value: '64px', width: 'w-16' },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                    <strong className="font-['Syncopate'] text-xs tracking-[0.15em]">{item.label}</strong>
                    <span className="font-['Montserrat'] text-sm text-[#8C7568]">{item.value}</span>
                    <div className={`h-[14px] rounded-full bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4] ${item.width}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motion, Sombras e Breakpoints */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Motion, sombras e breakpoints</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Microinterações sutis e profundidade moderada.</p>
              <div className="space-y-3 mt-4">
                <div className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                  <strong className="font-['Syncopate'] text-xs tracking-[0.15em]">default</strong>
                  <span className="font-['Montserrat'] text-sm text-[#8C7568]">0.3s</span>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white/84 border border-[#E8E3D9] font-['Montserrat'] text-sm w-fit">
                    <Sparkle className="w-4 h-4 text-[#C2996A]" />
                    all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
                  </div>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                  <strong className="font-['Syncopate'] text-xs tracking-[0.15em]">spring</strong>
                  <span className="font-['Montserrat'] text-sm text-[#8C7568]">0.3s</span>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white/84 border border-[#E8E3D9] font-['Montserrat'] text-sm w-fit">
                    <Zap className="w-4 h-4 text-[#C2996A]" />
                    hover e entradas controladas
                  </div>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                  <strong className="font-['Syncopate'] text-xs tracking-[0.15em]">shadow</strong>
                  <span className="font-['Montserrat'] text-sm text-[#8C7568]">cardHover</span>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white/84 border border-[#E8E3D9] font-['Montserrat'] text-sm w-fit">
                    <Layers3 className="w-4 h-4 text-[#C2996A]" />
                    0 4px 16px rgba(112,56,36,0.08)
                  </div>
                </div>
              </div>

              {/* Breakpoints */}
              <div className="space-y-2 mt-4 pt-4 border-t border-[#E8E3D9]">
                {[
                  { label: 'sm', value: '640px', desc: 'mobile grande / tablet pequeno' },
                  { label: 'lg', value: '1024px', desc: 'sidebar fixa e header deslocado' },
                  { label: 'xl', value: '1280px', desc: 'desktop amplo e layouts mais arejados' },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                    <strong className="font-['Syncopate'] text-xs tracking-[0.15em]">{item.label}</strong>
                    <span className="font-['Montserrat'] text-sm text-[#8C7568]">{item.value}</span>
                    <span className="font-['Montserrat'] text-sm text-[#8C7568]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================
              GRADIENTES E ÍCONES OFICIAIS
              ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            {/* Gradientes Oficiais */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Gradientes oficiais</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Aplicação principal em CTAs e destaques do painel.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-4 rounded-[3px] text-white" style={{ background: 'linear-gradient(135deg, #C2996A 0%, #8C7568 50%, #703824 100%)' }}>
                  <strong className="block font-['Montserrat'] text-lg">Primary</strong>
                  <span className="text-xs opacity-80 font-['Montserrat']">assinatura visual</span>
                </div>
                <div className="p-4 rounded-[3px] text-[#703824]" style={{ background: 'linear-gradient(135deg, #DEBBA4 0%, #C2996A 100%)' }}>
                  <strong className="block font-['Montserrat'] text-lg">Gold</strong>
                  <span className="text-xs opacity-80 font-['Montserrat']">progressos e ativos</span>
                </div>
                <div className="p-4 rounded-[3px] text-white" style={{ background: 'linear-gradient(135deg, #703824 0%, #903839 100%)' }}>
                  <strong className="block font-['Montserrat'] text-lg">Warm</strong>
                  <span className="text-xs opacity-80 font-['Montserrat']">CTAs fortes</span>
                </div>
                <div className="p-4 rounded-[3px] text-white" style={{ background: 'linear-gradient(135deg, #7C8A6E 0%, #5C6B63 100%)' }}>
                  <strong className="block font-['Montserrat'] text-lg">Sage</strong>
                  <span className="text-xs opacity-80 font-['Montserrat']">seções analíticas</span>
                </div>
              </div>
            </div>

            {/* Ícones Oficiais */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Ícones oficiais</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Usar Lucide com semântica clara.</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', desc: 'Visão geral' },
                  { icon: ClipboardList, label: 'Serviços', desc: 'Fluxos e listas' },
                  { icon: Users, label: 'Costureiras', desc: 'Pessoas e alocação' },
                  { icon: DollarSign, label: 'Financeiro', desc: 'KPIs e repasses' },
                ].map((item, index) => (
                  <div key={index} className="border border-[#E8E3D9] rounded-[3px] bg-white/80 p-4 grid gap-3">
                    <div className="w-10 h-10 rounded-[3px] grid place-items-center bg-[#F8F5F0] text-[#703824]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <strong className="font-['Montserrat'] text-sm font-semibold text-[#703824]">{item.label}</strong>
                    <p className="font-['Montserrat'] text-xs text-[#8C7568]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            COMPONENTES
            ============================================ */}
        <section className="py-16 max-w-7xl mx-auto px-8" id="componentes">
          <div className="flex justify-between items-end gap-5 flex-wrap mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <Component className="w-3.5 h-3.5" />
                Componentes
              </span>
              <h2 className="font-['Montserrat'] text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[#703824] mt-4">
                Átomos, moléculas e organismos apresentados em contexto.
              </h2>
            </div>
            <p className="max-w-[56ch] font-['Montserrat'] text-[#8C7568] leading-[1.7]">
              A vitrine abaixo replica os blocos que aparecem no dashboard: header, cards, visualização e alertas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Buttons & Badges */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Buttons e badges</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">CTAs discretos, contraste confortável.</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#703824] text-[#F8F5F0] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] hover:bg-[#8B4A2E] transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                  <Plus className="w-4 h-4" />
                  Novo serviço
                </button>
                <button className="px-6 py-3 bg-transparent text-[#703824] border border-[#BFB3A6] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] hover:bg-[#F8F5F0] transition-all hover:-translate-y-0.5">Relatórios</button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4] text-[#703824] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] shadow-sm hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md transition-all">Destaque</button>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { label: 'Primary', color: 'bg-[rgba(75,58,46,0.1)] text-[#703824]' },
                  { label: 'Gold', color: 'bg-[rgba(194,153,106,0.16)] text-[#C2996A]' },
                  { label: 'Sucesso', color: 'bg-[#EAF1E7] text-[#4B7A5B]' },
                  { label: 'Erro', color: 'bg-[#F7EAEA] text-[#903839]' },
                  { label: 'Neutro', color: 'bg-[rgba(191,179,166,0.16)] text-[#8C7568]' },
                ].map((badge, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full ${badge.color} font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase`}>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Busca e ações do header</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Campo de busca com ícone interno.</p>
              <div className="relative mt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C7568]" />
                <input className="w-full pl-10 pr-4 py-2.5 rounded-[3px] border border-[rgba(75,58,46,0.08)] bg-white/82 text-[#703824] font-['Montserrat'] text-sm transition-all duration-200 focus:outline-0 focus:border-[#C2996A] focus:shadow-[0_0_0_4px_rgba(194,153,106,0.15)]" type="search" placeholder="Buscar serviços, costureiras..." />
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button className="w-9 h-9 rounded-full border-0 bg-transparent text-[#703824] hover:bg-[#F8F5F0] hover:scale-108 transition-all" aria-label="Notificações">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 rounded-full border-0 bg-transparent text-[#703824] hover:bg-[#F8F5F0] hover:scale-108 transition-all" aria-label="Ajuda">
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#703824] text-[#F8F5F0] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-[3px] hover:bg-[#8B4A2E] transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                  <Plus className="w-4 h-4" />
                  Novo Serviço
                </button>
              </div>
            </div>

            {/* Stats Cards - com ícones e gradientes */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm md:col-span-2">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Cards de estatística</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1 leading-[1.7]">Hierarquia: rótulo curto, valor principal e variação.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { label: 'Serviços Ativos', value: '12', change: '+3 novos esta semana', color: 'from-[#E8E3D9] to-[#DEBBA4]' },
                  { label: 'Costureiras', value: '4', change: '1 nova contratada', color: '#7C8A6E' },
                  { label: 'Pagamentos Pendentes', value: '3', change: '2 em atraso', color: '#C2996A' },
                  { label: 'Entregas Previstas', value: '8', change: 'esta semana', color: '#903839' },
                ].map((stat, index) => (
                  <div key={index} className="relative flex-1 p-5 bg-white/80 border border-[#E8E3D9] rounded-md shadow-sm min-w-[220px] overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${index === 0 ? 'bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4]' : `bg-[${stat.color}]`} rounded-l-md`}></div>
                    <span className="font-['Montserrat'] text-sm text-[#8C7568]">{stat.label}</span>
                    <strong className="block font-['Montserrat'] text-2xl text-[#703824] mt-1">{stat.value}</strong>
                    <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-5 bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Alertas e avisos</h3>
              <span className="font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">4 itens</span>
            </div>
            <div className="space-y-0">
              {[
                { icon: '⏰', title: 'Serviço em atraso', desc: 'Cortina Ilhós - João Silva (Prazo: 25/06) • +2 dias', time: 'Hoje', bg: 'bg-[#F7EAEA]', color: 'text-[#903839]' },
                { icon: '⚠️', title: 'Próximo do prazo', desc: 'Almofadas - Maria Oliveira (Prazo: 28/06) • 3 dias', time: 'Hoje', bg: 'bg-[#FBF3E7]', color: 'text-[#C2996A]' },
                { icon: '✓', title: 'Serviço concluído', desc: 'Tapete - Ana Costa (Entregue em 20/06)', time: 'Ontem', bg: 'bg-[#EAF1E7]', color: 'text-[#4B7A5B]' },
                { icon: '📌', title: 'Novo serviço aguardando aprovação', desc: 'Cortina Romana - Pedro Santos', time: 'Ontem', bg: 'bg-[#F0ECE7]', color: 'text-[#7C7267]' },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-4 p-4 -mx-1 rounded-[3px] hover:bg-[#F8F5F0] transition-all border-b border-[#E8E3D9] last:border-b-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${alert.bg} ${alert.color}`}>
                    <span className="text-xl">{alert.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-['Montserrat'] text-sm font-semibold text-[#703824]">{alert.title}</div>
                    <div className="font-['Montserrat'] text-sm text-[#8C7568] mt-0.5">{alert.desc}</div>
                  </div>
                  <span className="font-['Montserrat'] text-xs text-[#BFB3A6] whitespace-nowrap pl-3">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            SHELL
            ============================================ */}
        <section className="py-16 max-w-7xl mx-auto px-8" id="shell">
          <div className="flex justify-between items-end gap-5 flex-wrap mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <MonitorSmartphone className="w-3.5 h-3.5" />
                Shell
              </span>
              <h2 className="font-['Montserrat'] text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[#703824] mt-4">
                Header, sidebar e conteúdo trabalhando como um organismo coeso.
              </h2>
            </div>
            <p className="max-w-[56ch] font-['Montserrat'] text-[#8C7568] leading-[1.7]">
              O preview abaixo resume o comportamento da interface: sidebar fixa no desktop,
              header sticky e área principal com blocos de leitura rápida.
            </p>
          </div>

          <div className="border border-[#E8E3D9] rounded-md overflow-hidden bg-white/84 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[560px]">
              {/* Sidebar */}
              <aside className="p-5 bg-gradient-to-b from-white/90 to-[rgba(248,243,239,0.92)] border-r border-[#E8E3D9] flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-4 mb-2 border-b border-[#E8E3D9]">
                  <span className="w-9 h-9 bg-[#E8E3D9] border border-[rgba(112,56,36,0.15)] rounded-[3px] grid place-items-center p-1.5">
                    <svg viewBox="0 0 60 90" className="w-full h-full">
                      <polyline points="6,20 54,10" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                      <polyline points="6,32 54,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                      <polyline points="54,32 6,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                      <polyline points="6,70 54,80" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>
                    <strong className="block font-['Syncopate'] text-[14px] tracking-[0.12em] uppercase text-[#703824]">Cony</strong>
                    <span className="block font-['Syncopate'] text-[9px] tracking-[0.1em] uppercase text-[#903839] -mt-0.5">Interiores</span>
                  </span>
                </div>

                <nav className="flex-1 space-y-1">
                  {[
                    { icon: LayoutDashboard, label: 'Dashboard', active: true },
                    { icon: ClipboardList, label: 'Serviços' },
                    { icon: Users, label: 'Costureiras' },
                    { icon: Gauge, label: 'Capacidade' },
                    { icon: DollarSign, label: 'Financeiro' },
                    { icon: Settings, label: 'Preferências' },
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center gap-3 px-4 py-3 rounded-[3px] ${item.active ? 'bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4] shadow-sm font-semibold' : 'text-[#703824] hover:bg-[rgba(222,187,164,0.25)]'} transition-all`}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  ))}
                </nav>

                <div className="pt-4 border-t border-[#E8E3D9] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#DEBBA4] to-[#903839] text-[#F8F5F0] flex items-center justify-center font-['Montserrat'] font-semibold text-sm flex-shrink-0">AM</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-['Montserrat'] text-sm font-semibold text-[#703824]">Ana Matos</div>
                    <div className="font-['Montserrat'] text-[11px] text-[#8C7568]">UX Lead</div>
                  </div>
                  <button className="p-2 rounded-full bg-transparent text-[#8C7568] hover:bg-[#F8F5F0] hover:text-[#703824] hover:rotate-45 transition-all flex-shrink-0" aria-label="Sair">
                    <LogOut className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </aside>

              {/* Content */}
              <div className="flex flex-col">
                <div className="p-4 px-5 border-b border-[#E8E3D9] flex flex-wrap items-center justify-between gap-4 bg-white/85">
                  <div className="flex items-center gap-4">
                    <div className="font-['Montserrat'] text-sm font-semibold text-[#703824] whitespace-nowrap">
                      Dashboard <span className="text-[#8C7568] font-normal">/ Visão Geral</span>
                    </div>
                  </div>
                  <div className="relative flex-1 min-w-[260px] max-w-[340px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C7568]" />
                    <input className="w-full pl-10 pr-4 py-2 rounded-[3px] border border-[rgba(75,58,46,0.08)] bg-white/82 text-[#703824] font-['Montserrat'] text-sm transition-all duration-200 focus:outline-0 focus:border-[#C2996A] focus:shadow-[0_0_0_4px_rgba(194,153,106,0.15)]" type="search" placeholder="Buscar pedidos, clientes ou materiais" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-full border-0 bg-transparent text-[#703824] hover:bg-[#F8F5F0] hover:scale-108 transition-all" aria-label="Notificações">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button className="w-9 h-9 rounded-full border-0 bg-transparent text-[#703824] hover:bg-[#F8F5F0] hover:scale-108 transition-all" aria-label="Ajuda">
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    <div className="inline-flex items-center gap-2 pl-3 border-l border-[#E8E3D9]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#DEBBA4] to-[#903839] text-[#F8F5F0] flex items-center justify-center font-['Montserrat'] text-xs font-semibold">AM</div>
                      <span className="font-['Montserrat'] text-sm font-semibold text-[#703824]">Ana</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 bg-gradient-to-b from-[rgba(246,243,239,0.42)] to-[rgba(255,255,255,0.32)]">
                  <div className="flex justify-between items-end flex-wrap gap-5 mb-0">
                    <div>
                      <h2 className="font-['Montserrat'] text-2xl font-semibold text-[#703824]">Visão geral da operação</h2>
                      <p className="font-['Montserrat'] text-sm text-[#8C7568]">Resumo de indicadores, carga de trabalho, atividades e alertas.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">header sticky</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: 'Serviços Ativos', value: '12', change: '+3 novos esta semana', color: 'from-[#E8E3D9] to-[#DEBBA4]' },
                      { label: 'Costureiras', value: '4', change: '1 nova contratada', color: '#7C8A6E' },
                      { label: 'Pagamentos Pendentes', value: '3', change: '2 em atraso', color: '#C2996A' },
                      { label: 'Entregas Previstas', value: '8', change: 'esta semana', color: '#903839' },
                    ].map((stat, index) => (
                      <div key={index} className="relative flex-1 p-4 bg-white/80 border border-[#E8E3D9] rounded-md shadow-sm min-w-[220px] overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${index === 0 ? 'bg-gradient-to-r from-[#E8E3D9] to-[#DEBBA4]' : `bg-[${stat.color}]`} rounded-l-md`}></div>
                        <span className="font-['Montserrat'] text-sm text-[#8C7568]">{stat.label}</span>
                        <strong className="block font-['Montserrat'] text-2xl text-[#703824] mt-1">{stat.value}</strong>
                        <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
                      <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Estrutura da página</h3>
                      <ul className="space-y-2 mt-2">
                        {[
                          { icon: PanelLeft, text: 'Sidebar fixa no desktop e oculta no mobile.' },
                          { icon: Search, text: 'Busca no header com largura adaptativa.' },
                          { icon: LayoutDashboard, text: 'Blocos principais em grid com cards reutilizáveis.' },
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 font-['Montserrat'] text-sm text-[rgba(75,58,46,0.84)] leading-[1.7]">
                            <item.icon className="w-4 h-4 text-[#C2996A] mt-0.5" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
                      <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Notas de implementação</h3>
                      <ul className="space-y-2 mt-2">
                        {[
                          { icon: PanelLeft, text: 'Mobile: sidebar em drawer e header com ação compacta.' },
                          { icon: Laptop, text: 'Desktop: sidebar fixa a partir de 1024px.' },
                          { icon: ShieldCheck, text: 'Foco visual apoiado por cores neutras e acentos dourados.' },
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 font-['Montserrat'] text-sm text-[rgba(75,58,46,0.84)] leading-[1.7]">
                            <item.icon className="w-4 h-4 text-[#C2996A] mt-0.5" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="py-10 max-w-7xl mx-auto px-8">
        <div className="bg-gradient-to-b from-white/84 to-[rgba(248,243,239,0.96)] border border-[#E8E3D9] rounded-md p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[34ch]">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/92 border border-[rgba(222,187,164,0.25)] font-['Syncopate'] text-[11px] tracking-[0.15em] uppercase text-[#8C7568] shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                Encerramento
              </span>
              <h3 className="font-['Montserrat'] text-xl font-semibold text-[#703824] mt-4">Base visual e textual para evolução do Design System Cony.</h3>
              <p className="font-['Montserrat'] text-sm text-[#8C7568] mt-2 leading-[1.7]">Este manual e o protótipo do dashboard definem o padrão de interface para as próximas entregas: tokens, componentes, comportamento responsivo e linguagem de UI.</p>
            </div>
            <div>
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Núcleos do DS</h3>
              <div className="flex flex-col gap-2 mt-2">
                <a href="#marca" className="font-['Montserrat'] text-sm text-[#8C7568] hover:text-[#703824] transition-colors">Marca e voz visual</a>
                <a href="#tokens" className="font-['Montserrat'] text-sm text-[#8C7568] hover:text-[#703824] transition-colors">Tokens oficiais</a>
                <a href="#componentes" className="font-['Montserrat'] text-sm text-[#8C7568] hover:text-[#703824] transition-colors">Biblioteca de componentes</a>
                <a href="#shell" className="font-['Montserrat'] text-sm text-[#8C7568] hover:text-[#703824] transition-colors">Shell responsivo</a>
              </div>
            </div>
            <div>
              <h3 className="font-['Montserrat'] text-lg font-semibold text-[#703824]">Recados de uso</h3>
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-['Montserrat'] text-sm text-[#8C7568]">Usar tokens oficiais antes de criar variações.</span>
                <span className="font-['Montserrat'] text-sm text-[#8C7568]">Manter nomes e textos iguais aos componentes do dashboard.</span>
                <span className="font-['Montserrat'] text-sm text-[#8C7568]">Priorizar clareza, sofisticação e conforto visual.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};