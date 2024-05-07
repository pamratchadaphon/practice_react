import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const Income = () => {
  const { idFarmer, idRicecrop } = useParams();
  const [values, setValues] = useState({
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
        // console.log(res.data.createdAt);
        // const createdAtDate = new Date(res.data.incomeDate);
        // const month = createdAtDate.getMonth() + 1;
        // const monthValue = month;
        // , { state: { monthValue ,amount: res.data.amount} }
        navigate(`/RicecropDetail/${idFarmer}/${idRicecrop}`, {
          state: { month: { month } },
        });
      })
      .catch((err) => console.log(err));
    alert("บันทึกรายรับเสร็จสิ้น");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/";
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios.post("http://localhost:8080/api/farmer/authen", null, config);
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  }, [idRicecrop]);

  return (
    <div className="flex">
      <div className="basis-[16%] h-[100vh]">
        <Sidebar idFarmer={idFarmer} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-[30px] py-[30px]">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                บันทึกรายรับ
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="incomeDate"
                  label="วันที่"
                  type="date"
                  InputLabelProps={{ shrink: true }} // Adjust label behavior
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
                  label="ราคา"
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
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  เพิ่ม
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
