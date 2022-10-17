import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditarTerefa({
  open,
  handeDiologer,
  handleSaveTarefa,
  tarefa,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handeDiologer}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Editar Tarefa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              autoFocus
              onChange={handleSaveTarefa}
              sx={{ width: "35vw" }}
              label={"Tarefa"}
              variant={"standard"}
              defaultValue={tarefa.name}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handeDiologer}>Cancelar</Button>
          <Button onClick={handleSaveTarefa}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
