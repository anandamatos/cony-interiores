import Sidebar from "../../components/organisms/Sidebar";

export default {
  title: "Organisms/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-offWhite">
        <h1 className="text-[32px] font-bold font-primary text-primary">Dashboard</h1>
        <p className="mt-2 max-w-xl text-[16px] leading-[1.7] text-primary/70">
          Área de conteúdo para validar o comportamento do menu lateral e o contraste geral do shell.
        </p>
      </div>
    </div>
  ),
};
