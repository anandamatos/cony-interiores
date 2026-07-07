import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import "../styles/CostureiraForm.css";

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
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">

      {/* NOME */}
      <input
        placeholder="Nome"
        {...register("nome", {
          required: "Nome é obrigatório",
        })}
      />
      {errors.nome && <p className="error">{errors.nome.message}</p>}

      {/* TELEFONE COM MÁSCARA */}
      <Controller
        name="telefone"
        control={control}
        rules={{
          required: "Telefone é obrigatório",
          validate: (value) =>
            value.replace(/\D/g, "").length === 11 || "Telefone inválido",
        }}
        render={({ field }) => (
          <IMaskInput
            {...field}
            mask="(00) 00000-0000"
            placeholder="(00) 00000-0000"
            onAccept={(value) => field.onChange(value)}
          />
        )}
      />

      {errors.telefone && (
        <p className="error">{errors.telefone.message}</p>
      )}

      {/* ESPECIALIDADE */}
      <input
        placeholder="Especialidade"
        {...register("especialidade", {
          required: "Especialidade é obrigatória",
        })}
      />

      {/* STATUS */}
      <select {...register("status")}>
        <option value="Ativa">Ativa</option>
        <option value="Inativa">Inativa</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
}