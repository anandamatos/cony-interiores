import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function CostureiraForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nome: "",
      telefone: "",
      especialidade: "",
      status: "Ativa",
    },
  });

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
    // Aqui você pode enviar para a API
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* NOME */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Nome *
        </label>
        <input
          placeholder="Nome da costureira"
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary placeholder:text-text-secondary placeholder:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          {...register("nome", {
            required: "Nome é obrigatório",
          })}
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-error">{errors.nome.message}</p>
        )}
      </div>

      {/* TELEFONE COM MÁSCARA */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Telefone *
        </label>
        <Controller
          name="telefone"
          control={control}
          rules={{
            required: "Telefone é obrigatório",
            validate: (value) =>
              value.replace(/\D/g, "").length === 11 || "Telefone inválido (ex: 11999999999)",
          }}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask="(00) 00000-0000"
              placeholder="(00) 00000-0000"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary placeholder:text-text-secondary placeholder:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              onAccept={(value) => field.onChange(value)}
            />
          )}
        />
        {errors.telefone && (
          <p className="mt-1 text-sm text-error">{errors.telefone.message}</p>
        )}
      </div>

      {/* ESPECIALIDADE */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Especialidade *
        </label>
        <input
          placeholder="Ex: Cortinas, Forros, Reformas"
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary placeholder:text-text-secondary placeholder:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          {...register("especialidade", {
            required: "Especialidade é obrigatória",
          })}
        />
        {errors.especialidade && (
          <p className="mt-1 text-sm text-error">{errors.especialidade.message}</p>
        )}
      </div>

      {/* STATUS */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Status
        </label>
        <select
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          {...register("status")}
        >
          <option value="Ativa">Ativa</option>
          <option value="Inativa">Inativa</option>
        </select>
      </div>

      {/* BOTÕES */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}