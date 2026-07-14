import Button from "../../components/atoms/Button";

export default {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "warning"],
    },
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Button Primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Button Secondary",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Button Danger",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: "Button Disabled",
  },
};
