import { useRef } from "react";
import { Box, Container, Grid, Icon, Paper, TextField } from "@mui/material";

import axios from "axios";

export default function FormItem({ data }) {
  const tarefaRef = useRef();

  const handleTarefa = async () => {
    const newId = data.id + 1;

    const newData = {
      id: newId,
      name: tarefaRef.value,
      done: false,
    };

    const request = await axios.post("http://localhost:3001/tarefas", newData);
  };

  return (
    <>
      <Container maxWidth={"xs"} sx={{ pt: 5 }}>
        <Paper sx={{ p: 1 }}>
          <Box component={"form"}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={10}>
                <TextField
                  onChange={(e) => (tarefaRef.value = e.target.value)}
                  fullWidth
                  label={"Tarefa"}
                  variant={"standard"}
                />
              </Grid>
              <Grid item xs={2}>
                <Icon
                  onClick={() => handleTarefa()}
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  add
                </Icon>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
