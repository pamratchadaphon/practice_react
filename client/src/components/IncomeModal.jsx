import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const IncomeModal = ({ open, handleClose, income, selectedMonth }) => {
    console.log(selectedMonth);
    const [value, setValue] = useState({
        incomeDate: income.incomeDate , 
        incomeDetails: income.incomeDetails || "",
        amount: income.amount || 0, 
    });

    useEffect(() => {
        setValue({
            incomeDate: income.incomeDate,
            incomeDetails: income.incomeDetails || "",
            amount: income.amount || 0,
        });
    }, [income]);

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

    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/income/editIncome/${income.id}`, value);
            handleClose();
            const date = new Date(income.incomeDate);
            const month = date.getMonth()+1
            // setSelectedMonth(month)
            console.log(income.ricecropID);
            console.log(month);
            
        } catch (error) {
            console.error('Error updating income data:', error);
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
                        แก้ไขรายรับ
                    </Typography>
                    <TextField
                        id="date"
                        label="วันที่"
                        type="date"
                        value={formatDate(value.incomeDate)}
                        onChange={(e) => setValue({ ...value, incomeDate: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="item"
                        label="รายการ"
                        type="text"
                        value={value.incomeDetails}
                        onChange={(e) => setValue({ ...value, incomeDetails: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="amount"
                        label="ราคา"
                        type="number"
                        value={value.amount}
                        onChange={(e) => setValue({ ...value, amount: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        บันทึก
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default IncomeModal;
