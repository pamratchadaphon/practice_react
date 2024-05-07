import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {TextField } from "@mui/material";

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

export default function BasicModal({ idFarmer, idRicecrop }) {
  const [values, setValues] = React.useState({
    date: new Date().toISOString().split("T")[0],
    detail: "",
    price: "",
    type: "รายรับ",
    farmerID: idFarmer,
    ricecropID: idRicecrop,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/incomeExpense/addIncomeExpense", values)
      .then((res) => {
        const date = new Date(res.data.incomeDate);
        const month = date.getMonth() + 1;
        console.log(month);
        navigate(`/RicecropDetail/${idFarmer}/${idRicecrop}`, {
          state: { month: { month } },
        });
      })
      .catch((err) => console.log(err));
    alert("บันทึกรายรับเสร็จสิ้น");
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button  variant="outlined" size="small" color="success" onClick={handleOpen}>
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            เพิ่มรายรับ
          </Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="incomeDate"
              label="วันที่"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.date}
              onChange={(e) =>
                setValues((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="incomeDetails"
              label="รายการ"
              type="text"
              InputLabelProps={{ shrink: true }}
              value={values.detail}
              onChange={(e) =>
                setValues((prevState) => ({
                  ...prevState,
                  detail: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="ราคา (บาท)"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={values.price}
              onChange={(e) =>
                setValues((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
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
