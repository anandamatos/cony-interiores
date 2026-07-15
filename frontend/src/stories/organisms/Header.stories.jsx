import Header from "../../components/organisms/Header";

export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="border-b border-gray-200">
      <Header />
    </div>
  ),
};