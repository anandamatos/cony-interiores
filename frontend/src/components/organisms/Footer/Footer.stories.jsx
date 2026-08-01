import Footer from './index';

export default {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <div className="min-h-screen bg-offWhite flex items-end">
    <Footer className="w-full" />
  </div>
);