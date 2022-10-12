import { useState } from "react";

import { Container } from "@mui/system";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import FormItem from "../components/FormItem";
import ListTarefas from "../components/ListTarefas";

export default function Home() {
  const [tarefa, setTarefa] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["tarefas"],
    async () => {
      const request = await axios.get("http://localhost:3001/tarefas");
      return request.data;
    },
    {
      staleTime: 1000 * 60,
    }
  );

  const mutation = useMutation("postTarefa", {
    onSuccess: () => {
      queryClient.invalidateQueries(["tarefas"]);
    },
  });

  const handleAddTarefa = async (values) => {
    const newId = data.id + 1;
    const newData = {
      id: newId,
      name: values,
      done: false,
    };

    await axios.post("http://localhost:3001/tarefas", newData);

    await queryClient.invalidateQueries(["tarefas"]);
    document.getElementById("input").value = null;
  };

  const handleChecked = async (tarefa) => {
    const newData = {
      id: tarefa.id,
      name: tarefa.name,
      done: !tarefa.done,
    };

    await axios.put(`http://localhost:3001/tarefas/${tarefa.id}`, newData);

    await queryClient.invalidateQueries(["tarefas"]);
  };

  const handleSaveTarefa = async (tarefa) => {
    const newData = {
      id: tarefa.id,
      name: tarefa.name,
      done: tarefa.done,
    };

    await axios.put(`http://localhost:3001/tarefas/${tarefa.id}`, newData);

    await queryClient.invalidateQueries(["tarefas"]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/tarefas/${id}`);
    await queryClient.invalidateQueries(["tarefas"]);
  };

  return (
    <>
      <Container maxWidth={"xl"} sx={{ background: "#c6c6c6" }}>

        <FormItem
          tarefa={tarefa}
          setTarefa={setTarefa}
          handleAddTarefa={handleAddTarefa}
        />

        <ListTarefas
          data={data}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
    </>
  );
}
