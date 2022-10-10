import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import FormItem from "../components/FormItem";
import ListTarefas from "../components/ListTarefas";

const handleData = async () => {
  const request = await fetch("http://localhost:3001/tarefas");
  const data = await request.json();
  return data;
};

export default function Home() {
  const [checked, setChecked] = useState([]);

  const { data, isLoading, isError } = useQuery(["tarefas"], handleData);

  const handleChecked = async(id) => {
    let changeChecked = [...data];
    for (var i in changeChecked) {
      if (changeChecked[i].id === id) {
        changeChecked[i].done = !changeChecked[id].done;
      }
    }
    setChecked(changeChecked);
  };

   return (
    <>
      <Container maxWidth={"xl"} sx={{ background: "#c6c6c6" }}>
        <FormItem data={data}/>
        <ListTarefas
          data={data}
          handleChecked={handleChecked}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
    </>
  );
}
