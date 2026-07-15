import CostureiraTable from "../../components/molecules/CostureiraTable";

export default {
  title: "Molecules/CostureiraTable",
  component: CostureiraTable,
  tags: ["autodocs"],
};

const mockData = [
  { id: 1, name: "Maria Silva", specialty: "Costura Geral", status: "active", orders: 12 },
  { id: 2, name: "Joana Santos", specialty: "Bordado", status: "active", orders: 8 },
  { id: 3, name: "Ana Pereira", specialty: "Modelagem", status: "inactive", orders: 3 },
];

export const Default = {
  args: {
    data: mockData,
  },
};

export const Empty = {
  args: {
    data: [],
  },
};
