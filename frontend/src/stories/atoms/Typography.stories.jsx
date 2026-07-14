import Typography from "../../components/atoms/Typography";

export default {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body1", "body2", "body", "caption"],
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold"],
    },
    className: { control: "text" },
  },
};

export const H1 = {
  args: {
    variant: "h1",
    children: "Heading 1 - Título Principal",
  },
};

export const H2 = {
  args: {
    variant: "h2",
    children: "Heading 2 - Título de Seção",
  },
};

export const H3 = {
  args: {
    variant: "h3",
    children: "Heading 3 - Subtítulo",
  },
};

export const Body = {
  args: {
    variant: "body1",
    children:
      "Body text - Texto padrão para conteúdos longos. Este é o estilo principal para parágrafos e descrições.",
  },
};

export const BodySmall = {
  args: {
    variant: "body2",
    children: "Body small - Texto auxiliar para metadados e descrições curtas.",
  },
};

export const Caption = {
  args: {
    variant: "caption",
    children: "Caption - Texto auxiliar para informações complementares",
  },
};

export const AllVariants = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body1">Body text</Typography>
      <Typography variant="body2">Body small</Typography>
      <Typography variant="caption">Caption text</Typography>
    </div>
  ),
};

export const WeightVariants = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="thin">Thin 100</Typography>
      <Typography weight="light">Light 300</Typography>
      <Typography weight="normal">Normal 400</Typography>
      <Typography weight="medium">Medium 500</Typography>
      <Typography weight="semibold">Semibold 600</Typography>
      <Typography weight="bold">Bold 700</Typography>
      <Typography weight="extrabold">Extrabold 800</Typography>
    </div>
  ),
};
