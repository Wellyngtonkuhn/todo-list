import { useState } from "react";

import { Container } from "@mui/system";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import FormItem from "../components/FormItem";
import ListTarefas from "../components/ListTarefas";
import { Experimental_CssVarsProvider } from "@mui/material";

export default function Home() {
  const [tarefa, setTarefa] = useState(null);

  const queryClient = useQueryClient();

  // Fetch the data
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

  // Update the cache
  const upDateCache = (newTask) => {
    const previousCacheData = queryClient.getQueriesData("tarefas");
    const cacheData = previousCacheData[0][1];

    if (cacheData) {
      queryClient.setQueryData(["tarefas"], (oldCache) => {
        return [...oldCache, newTask];
      });
    }
  };

  // Post New Tarefa
  const handleAddTarefa = async (tarefa) => {
    const newId = Math.floor(Math.random() * (10000 - 1) + 1);
    let newTask = {
      id: newId,
      name: tarefa,
      done: false,
    };

    await axios.post("http://localhost:3001/tarefas", newTask);

    upDateCache(newTask);

    document.getElementById("input").value = "";
    document.getElementById("input").focus();
  };

  const handleChecked = async (tarefa) => {
    const newTask = {
      id: tarefa.id,
      name: tarefa.name,
      done: !tarefa.done,
    };

    await axios.put(`http://localhost:3001/tarefas/${tarefa.id}`, newTask);

    queryClient.invalidateQueries("tarefas");
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
