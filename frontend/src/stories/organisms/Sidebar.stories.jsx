import Sidebar from "../../components/organisms/Sidebar";
import { MemoryRouter } from "react-router-dom";

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
    <MemoryRouter>
      <div className="min-h-screen bg-offWhite">
        <Sidebar />
        <div className="min-h-screen lg:pl-64 p-8">
          <h1 className="text-[32px] font-bold font-primary text-primary">Dashboard</h1>
          <p className="mt-2 max-w-xl text-[16px] leading-[1.7] text-primary/70">
            Area de conteudo para validar o comportamento do menu lateral fixo e o contraste geral do shell.
          </p>
        </div>
      </div>
    </MemoryRouter>
  ),
};
