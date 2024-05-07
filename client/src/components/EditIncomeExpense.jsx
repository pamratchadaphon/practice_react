import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

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

export default function BasicModal({ id }) {
  const [values, setValues] = useState({
    price: "",
    date: "",
    detail: "",
    type: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/incomeExpense/getOneIncomeExpense/${id}`
      );
      console.log(res.data.date);
      setValues({
        date: res.data.date,
        detail: res.data.detail,
        price: res.data.price,
        type: res.data.type,
      });
    };
    fetchData();
  }, [id]);

  function detailForm() {
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
    if (values.type === "รายรับ") {
      return (
        <TextField
          margin="normal"
          required
          fullWidth
          id="detail"
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
      );
    } else {
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">รายการ</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.detail}
            label="Age"
            sx={{ mt: 1 }}
            onChange={(e) => setValues({ ...values, detail: e.target.value })}
          >
            {detailName.map((list, index) => (
              <MenuItem value={list}>{list}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    axios
      .put(`/api/incomeExpense/editIncomeExpense/${id}`, values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClose();
    window.location.reload();
  }

  return (
    <div>
      <EditIcon
        onClick={handleOpen}
        className="cursor-pointer"
        color="primary"
      ></EditIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            แก้ไข{values.type}
          </Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            {detailForm()}
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
              บันทึก
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
