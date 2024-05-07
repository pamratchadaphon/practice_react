import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius:3
};

export default function BasicModal({ idFarmer }) {
  const [values, setValues] = React.useState({
    year: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    riceVarietie: "",
    area: "",
    farmerID: idFarmer,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/ricecrop/addRicecrop", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOpen(false)
    window.location.reload()
  }
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        สร้างรอบการปลูกข้าว
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            สร้างรอบการปลูกข้าว
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="year"
              label="ปี"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={values.year}
              onChange={(e) => setValues({ ...values, year: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="startDate"
              label="วันที่ปลูก"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.startDate}
              onChange={(e) =>
                setValues({ ...values, startDate: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="endDate"
              label="วันที่เก็บเกี่ยว"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.endDate}
              onChange={(e) =>
                setValues({ ...values, endDate: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="variety"
              label="พันธุ์ข้าว"
              type="text"
              InputLabelProps={{ shrink: true }}
              value={values.riceVarietie}
              onChange={(e) =>
                setValues({ ...values, riceVarietie: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="area"
              label="พื้นที่ (ไร่)"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={values.area}
              onChange={(e) => setValues({ ...values, area: e.target.value })}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              เพิ่ม
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
