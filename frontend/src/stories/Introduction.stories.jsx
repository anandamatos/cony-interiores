import React from 'react';

export default {
  title: 'Introdução/Bem-vindo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design System da Cony Interiores - Referência visual e técnica para construir interfaces consistentes, acessíveis e alinhadas com o produto.',
      },
    },
  },
};

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F0] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E8E3D9] border border-[rgba(112,56,36,0.15)] rounded-sm flex items-center justify-center p-2">
              <svg viewBox="0 0 60 90" className="w-full h-full">
                <polyline points="6,20 54,10" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="6,32 54,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="54,32 6,58" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
                <polyline points="6,70 54,80" fill="none" stroke="#703824" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-['Syncopate'] text-2xl tracking-[0.3em] uppercase text-[#703824]">Cony</h1>
              <span className="font-['Syncopate'] text-xs tracking-[0.15em] uppercase text-[#903839] block -mt-1">Interiores</span>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase">
            Design System v3
          </span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/72 border border-[rgba(222,187,164,0.3)] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase text-[#8C7568]">
              <span>✦</span> Referência oficial do dashboard
            </span>
            <h2 className="font-['Montserrat'] text-4xl md:text-5xl font-bold leading-[1.1] text-[#703824] mt-6 max-w-[12ch]">
              Manual para manter o dashboard Cony consistente.
            </h2>
            <p className="text-lg text-[rgba(75,58,46,0.8)] leading-relaxed mt-4 max-w-[58ch]">
              Este documento traduz o que está em tela no protótipo: tokens, estrutura, componentes,
              estados e textos de interface usados no dashboard operacional.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="?path=/story/tokens-cores" className="px-6 py-3 bg-[#703824] text-[#F8F5F0] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-sm hover:bg-[#8B4A2E] transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                Explorar tokens
              </a>
              <a href="?path=/story/atoms-button--default" className="px-6 py-3 bg-transparent text-[#703824] border border-[#BFB3A6] font-['Syncopate'] text-xs tracking-[0.15em] uppercase rounded-sm hover:bg-[#F8F5F0] transition-all hover:-translate-y-0.5">
                Ver biblioteca
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8E3D9] rounded-md p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-['Montserrat'] text-xl font-semibold text-[#703824]">Snapshot do DS</h3>
                <p className="text-sm text-[#8C7568] mt-1">Checklist visual para manter novas telas alinhadas.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[rgba(194,153,106,0.16)] text-[#C2996A] font-['Syncopate'] text-[10px] tracking-[0.15em] uppercase flex items-center gap-1">
                <span>✓</span> 2.0.0
              </span>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                <span className="text-[#C2996A] mt-0.5">✓</span>
                <span>Brand first: toda interface reflete a identidade da Cony.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                <span className="text-[#C2996A] mt-0.5">✓</span>
                <span>Uso exclusivo dos tokens oficiais para cor, tipografia, borda e sombra.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[rgba(75,58,46,0.84)]">
                <span className="text-[#C2996A] mt-0.5">✓</span>
                <span>Componentes consistentes, discretos e fáceis de reaplicar.</span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 rounded-sm bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                <strong className="block font-['Montserrat'] text-xl text-[#703824]">4</strong>
                <span className="text-xs text-[#8C7568]">cards de estatística base</span>
              </div>
              <div className="p-3 rounded-sm bg-gradient-to-r from-[#F8F5F0] to-[#E8E3D9] border border-[#E8E3D9]">
                <strong className="block font-['Montserrat'] text-xl text-[#703824]">3</strong>
                <span className="text-xs text-[#8C7568]">gradientes oficiais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};