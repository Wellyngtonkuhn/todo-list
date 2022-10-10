import { Container } from "@mui/system";
import {
  Checkbox,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

export default function ListTarefas({ data, handleChecked}) {
  return (
    <Container maxWidth={"xs"}>
      <List sx={{ width: "100%" }}>
        {data &&
          data.map((tarefa) => {
            return (
              <Paper sx={{ mt: 1, pl: 1 }}>
                <ListItem
                  key={tarefa.id}
                  secondaryAction={
                    <Icon
                      sx={{ cursor: "pointer" }}
                      edge="end"
                      aria-label="comments"
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
                      onClick={() => handleChecked(tarefa.id)}
                    />
                  </ListItemIcon>
                  <ListItemText id={tarefa.id} primary={tarefa.name} />
                </ListItem>
              </Paper>
            );
          })}
      </List>
    </Container>
  );
}
