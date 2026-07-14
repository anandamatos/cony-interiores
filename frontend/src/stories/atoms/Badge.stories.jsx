import Badge from "../../components/atoms/Badge";

export default {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Success = {
  args: {
    variant: "success",
    children: "Sucesso",
  },
};

export const Warning = {
  args: {
    variant: "warning",
    children: "Atenção",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Erro",
  },
};

export const Neutral = {
  args: {
    variant: "neutral",
    children: "Neutro",
  },
};

export const Small = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Pequeno",
  },
};

export const Large = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Grande",
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};
