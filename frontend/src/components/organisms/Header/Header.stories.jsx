import Header from './index';

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <div className="min-h-[180px] bg-offWhite pt-[88px]">
    <Header notificationCount={3} />
    <div className="px-10 py-8 text-taupe">Header sticky alinhado ao shell do dashboard.</div>
  </div>
);