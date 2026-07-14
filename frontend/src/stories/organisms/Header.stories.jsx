import Header from "../../components/organisms/Header";
import { MemoryRouter } from "react-router-dom";

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
    <MemoryRouter>
      <div className="min-h-[220px] bg-offWhite">
        <Header />
        <div className="pt-16 px-6 py-8 text-primary">
          Conteudo para validar comportamento do header fixo e espacamento no mobile.
        </div>
      </div>
    </MemoryRouter>
  ),
};
