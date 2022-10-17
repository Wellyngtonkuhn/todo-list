import { Box, Container, Grid, Icon, Paper, TextField } from "@mui/material";

export default function FormItem({ handleAddTarefa, tarefa, setTarefa }) {
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
                  id={"input"}
                  autoFocus
                  onChange={(e) => setTarefa(e.target.value)}
                  fullWidth
                  label={"Tarefa"}
                  variant={"standard"}
                />
              </Grid>
              <Grid item xs={2}>
                <Icon
                  onClick={() => handleAddTarefa(tarefa)}
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
