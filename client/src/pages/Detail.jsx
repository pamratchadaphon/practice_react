import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import TableIncomeExpense from "../components/TableIncomeExpense";
import TextField from "@mui/material/TextField";

const Detail = () => {
  const { idFarmer, idRicecrop } = useParams();
  const idAsInt = Number(idFarmer);
  const [fname, setFirstName] = useState("")
  const [lname, setLastName] = useState("")
  const [selectMonth, setSelectMont] = useState("");
  const [monthArray, setMonthArray] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const farmerResponse = await axios.get(`/api/farmer/${idAsInt}`);
      setFirstName(farmerResponse.data.fname);
      setLastName(farmerResponse.data.lname);

      const startMonth = new Date(res.data[0].startDate).getMonth() + 1;
      const endMonth = new Date(res.data[0].endDate).getMonth() + 1;

      const monthSeleteArry = [];
      const month12 = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤษจิกายน",
        "ธันวาคม",
      ];
      for (let i = startMonth - 1; i < endMonth; i++) {
        for (let j = 0; j < month12.length; j++) {
          if (i + 1 === j + 1) {
            monthSeleteArry[i] = month12[j];
          }
        }
      }
      setMonthArray(monthSeleteArry);
    };
    fetchData();
  }, [idRicecrop,idAsInt]);

  return (
    <div className=" bg-gray-100">
      <Navbar idFarmer={idAsInt} fname={fname} lname={lname}/>
      <div className="mx-32 mt-4">
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%", mb: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            
            <TextField
              id="outlined-basic"
              label="ค้นหา"
              variant="outlined"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </div>
        <div>
          <div className="flex">
            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className="w-[200px]">
                  <InputLabel id="demo-simple-select-label">เดือน</InputLabel>
                  <Select
                    value={selectMonth}
                    label="เดือน"
                    onChange={(e) => setSelectMont(e.target.value)}
                  >
                    <MenuItem value="">เดือน</MenuItem>
                    {monthArray.map((m, i) => (
                      <MenuItem key={i} value={i + 1}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="ml-3">
              <Box sx={{ minWidth: 120 }}>
                <FormControl className="w-[200px]">
                  <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
                  <Select
                    value={type}
                    label="ประเภท"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="">ประเภท</MenuItem>
                    <MenuItem value="รายรับ">รายรับ</MenuItem>
                    <MenuItem value="รายจ่าย">รายจ่าย</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div className="pt-3">
            <div>
              <TableIncomeExpense
                idRicecrop={idRicecrop}
                search={search}
                selectMonth={selectMonth}
                type={type}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Detail;
