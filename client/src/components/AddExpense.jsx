import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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
  borderRadius: 3,
};

export default function BasicModal({ idFarmer, idRicecrop }) {
  const [values, setValues] = React.useState({
    price: "",
    date: new Date().toISOString().split("T")[0],
    detail: "",
    farmerID: idFarmer,
    ricecropID: idRicecrop,
    type: "รายจ่าย",
  });

  const detailName = [
    "จ้างคนย่ำนา",
    "ค่าจ้างคนหว่านเมล็ดพันธ์ข้าว",
    "ค่าจ้างคนหว่านปุ๋ยเคมี",
    "น้ำมันเชื้อเพลิง",
    "ปั่นนา",
    "ปุ๋ยเคมี",
    "รถดำนา",
    "รถเกี่ยว",
    "รถเข็นข้าว",
    "เช่านา",
    "เมล็ดพันธ์ข้าว",
    "ยาคุมหญ้า",
    "ยาป้องกันแมลง",
    "ยาฆ่าแมลง",
    "ไถนา",
  ];

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/incomeExpense/addIncomeExpense", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("บันทึกรายจ่ายเสร็จสิ้น");
    navigate(`/RicecropDetail/${idFarmer}/${idRicecrop}`);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" size="small" color="error" onClick={handleOpen}>
        <RemoveIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            เพิ่มรายจ่าย
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">รายการ</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.detail}
                label="Age"
                sx={{ mt: 1 }}
                onChange={(e) =>
                  setValues({ ...values, detail: e.target.value })
                }
              >
                {detailName.map((list, index) => (
                  <MenuItem key={index} value={list}>{list}</MenuItem>
                ))}
              </Select>
            </FormControl>

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
