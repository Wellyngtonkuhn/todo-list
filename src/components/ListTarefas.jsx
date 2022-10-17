import { useState } from "react";
import { Container } from "@mui/system";
import {
  Checkbox,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
} from "@mui/material";
import EditarTerefa from "./EditarTerefa";

export default function ListTarefas({
  data,
  isLoading,
  handleChecked,
  handleDelete,
}) {
  const [openDiologer, setOpenDiologer] = useState(false);

  const handeDiologer = () => {
    setOpenDiologer(!openDiologer);
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <List sx={{ width: "100%" }}>
          {isLoading && (
            <Paper>
              <ListItem>
                <Skeleton width={"100%"} height={40} />
              </ListItem>
              <ListItem>
                <Skeleton width={"100%"} height={40} />
              </ListItem>
              <ListItem>
                <Skeleton width={"100%"} height={40} />
              </ListItem>
            </Paper>
          )}

          {data &&
            data.map((tarefa) => {
              return (
                <Paper sx={{ mt: 1, p: 1 }} key={tarefa.id}>
                  <ListItem
                    secondaryAction={
                      <Icon
                        sx={{ cursor: "pointer" }}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(tarefa.id)}
                      >
                        delete
                      </Icon>
                    }
                    disablePadding
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={tarefa.done}
                        onChange={() => handleChecked(tarefa)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      sx={{ cursor: "pointer" }}
                      onClick={() => handeDiologer()}
                      id={tarefa.id}
                      primary={tarefa.name}
                    />
                    <EditarTerefa
                      tarefa={tarefa}
                      open={openDiologer}
                      handeDiologer={handeDiologer}
                    />
                  </ListItem>
                </Paper>
              );
            })}
        </List>
      </Container>
    </>
  );
}
