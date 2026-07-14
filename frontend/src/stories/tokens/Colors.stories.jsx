import { colors } from "../../styles/tokens/colors";

export default {
  title: "Tokens/Cores",
  parameters: {
    docs: {
      description: {
        component: "Sistema de cores da Cony Interiores",
      },
    },
  },
};

export const Primary = {
  render: () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cores Primárias (Verde Cony)</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(colors.primary).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="w-full h-12 rounded" style={{ backgroundColor: value }} />
            <span className="text-xs">{key}</span>
            <span className="text-xs block">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Secondary = {
  render: () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cores Secundárias (Laranja Cony)</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(colors.secondary).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="w-full h-12 rounded" style={{ backgroundColor: value }} />
            <span className="text-xs">{key}</span>
            <span className="text-xs block">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
