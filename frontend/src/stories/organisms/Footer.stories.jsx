import Footer from "../../components/organisms/Footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Página com Footer</h1>
        <p className="text-gray-600">O footer está no final da página.</p>
      </div>
      <Footer />
    </div>
  ),
};
