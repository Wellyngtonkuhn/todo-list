import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditarTerefa({ open, handeDiologer, handleSaveTarefa, tarefa }) {

  console.log(tarefa)
  
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
              onChange={''}
              sx={{ width: "35vw" }}
              label={"Tarefa"}
              variant={"standard"}
              defaultValue={tarefa.name}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handeDiologer}>Cancelar</Button>
          <Button onClick={''}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
