import Header from "../../components/organisms/Header";

export default {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <div className="border-b border-border bg-white/70 backdrop-blur-md">
      <Header />
    </div>
  ),
};
