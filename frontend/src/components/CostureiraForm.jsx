import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { useCostureiras } from "../context/CostureiraContext";
import "../styles/CostureiraForm.css";

export default function CostureiraForm({
  editando,
  initialData,
}) {
  const navigate = useNavigate();
  const { adicionarCostureira, editarCostureira } = useCostureiras();

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

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
  if (editando) {
    editarCostureira(initialData.id, data);
  } else {
    adicionarCostureira(data);
  }

  navigate("/costureiras");
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">

      <input
        placeholder="Nome"
        {...register("nome", {
          required: "Nome é obrigatório",
        })}
      />
      {errors.nome && <p className="error">{errors.nome.message}</p>}

      <Controller
        name="telefone"
        control={control}
        rules={{
          required: "Telefone é obrigatório",
          validate: (value) =>
            value.replace(/\D/g, "").length === 11 ||
            "Telefone inválido",
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

      <input
        placeholder="Especialidade"
        {...register("especialidade", {
          required: "Especialidade é obrigatória",
        })}
      />

      <select {...register("status")}>
        <option value="Ativa">Ativa</option>
        <option value="Inativa">Inativa</option>
      </select>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/costureiras")}
        >
          Cancelar
        </button>

        <button type="submit" className="save-button">
          {editando ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}