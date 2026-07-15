import Button from "../../components/atoms/Button";
import { Plus } from "lucide-react";

export default {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "gold", "terracota", "danger", "ghost", "outline"],
    },
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Novo Serviço",
    icon: Plus,
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Relatórios",
  },
};

export const Gold = {
  args: {
    variant: "gold",
    children: "Destaque",
  },
};

export const Outline = {
  args: {
    variant: "outline",
    children: "Cancelar",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: "Desativado",
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" icon={Plus}>Novo Serviço</Button>
      <Button variant="secondary">Relatórios</Button>
      <Button variant="gold">Gold</Button>
      <Button variant="terracota">Terracota</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
