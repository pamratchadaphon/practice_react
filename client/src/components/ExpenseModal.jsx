import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ExpenseModal = ({
  open,
  handleClose,
  expense,
  sendDataToParentExpense,
}) => {
  const [value, setValue] = useState({
    id: expense.id,
    date: expense.date,
    detail: expense.detail || "",
    amount: expense.amount || 0,
  });


  useEffect(() => {
    setValue({
      id: expense.id,
      date: expense.date,
      detail: expense.detail || "",
      amount: expense.amount || 0,
    });
  }, [expense]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "8px",
    p: 4,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/expense/editExpense/${expense.id}`, value);
      handleClose();
      sendDataToParentExpense(value);
    } catch (error) {
      console.error("Error updating expense data:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" align="center" gutterBottom>
            แก้ไขรายจ่าย
          </Typography>
          <TextField
            id="date"
            label="วันที่"
            type="date"
            value={formatDate(value.date)}
            onChange={(e) => setValue({ ...value, date: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">รายการ</InputLabel>
            <Select
              id="detail"
              name="detail"
              label="รายการ"
              required
              value={value.detail}
              onChange={(e) => setValue({ ...value, detail: e.target.value })}
            >
              <MenuItem value="">-- เลือกรายการ --</MenuItem>
              {[
                "ไถนา",
                "เมล็ดพันธ์ุข้าว",
                "ปั่นนา",
                "จ้างคนย่ำนา",
                "รถดำนา",
                "ค่าจ้างคนหว่านเมล็ดพันธุ์ข้าว",
                "ปุ๋ยเคมี",
                "ค่าจ้างคนหว่านปุ๋ยเคมี",
                "รถดำนา",
                "ยาคุมหญ้า",
                "ยาป้องกันแมลง",
                "ยาฆ่าแมลง",
                "น้ำมันเชื้อเพลิง",
                "เช่านา",
                "รถเข็นข้าว",
                "รถเกี่ยว",
              ].map((list, index) => (
                <MenuItem key={index} value={list}>
                  {list}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="amount"
            label="ราคา"
            type="number"
            value={value.amount}
            onChange={(e) => setValue({ ...value, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={sendDataToParentExpense}
          >
            บันทึก
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ExpenseModal;
