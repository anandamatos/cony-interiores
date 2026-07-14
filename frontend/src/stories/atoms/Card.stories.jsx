import Card from "../../components/atoms/Card";

export default {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    hover: { control: "boolean" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">Card Title</h3>
        <p className="text-gray-600 mt-2">
          This is a card content. Cards are used to group related information.
        </p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
          Action
        </button>
      </div>
    ),
  },
};

export const WithHover = {
  args: {
    hover: true,
    children: (
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">Hover Card</h3>
        <p className="text-gray-600 mt-2">Hover over this card to see the effect!</p>
        <span className="inline-block mt-4 text-sm text-primary">Learn more →</span>
      </div>
    ),
  },
};
