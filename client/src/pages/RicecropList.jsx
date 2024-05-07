import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddIncome from "../components/AddIncome";
import AddExpense from "../components/AddExpense";
import AddRicecrop from "../components/AddRicecrop";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Ricecrop = () => {
  const [ricecrop, setRicecrop] = useState([]);
  const { id } = useParams();
  const idAsInt = Number(id);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [years, setYears] = useState("");

  const handleChange = (event) => {
    setYears(event.target.value);
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

        const authResponse = await axios.post(
          "http://localhost:8080/api/farmer/authen",
          null,
          config
        );
        if (authResponse.data.status === "ok") {
          const res = await axios.get(
            `/api/farmer/getFarmerRicecrop/${idAsInt}`,
            config
          );

          setFirstName(res.data[0].fname);
          setLastName(res.data[0].lname);
          setRicecrop(res.data[0].RiceCrop);
        } else {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data");
        window.location.href = "/";
      }
    };

    fetchData();
  }, [idAsInt,years]);

  useEffect(() => {
    // const fillerYear =ricecrop.filter((f)=> f.year.includes(years))
    // console.log(fillerYear);
  }, [years, ricecrop]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        <div>
          <Navbar idFarmer={idAsInt} fname={fname} lname={lname}></Navbar>
        </div>
        {/* <div className="basis-[16%] h-[100vh]">
          <Sidebar
            idFarmer={idAsInt}
            fname={farmerbyID[0]?.fname}
            lname={farmerbyID[0]?.lname}
          />
          
        </div> */}
        {/* <div className="basis-[84%] border"> */}
        <div className="mx-32 mt-4">
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">ปี</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={years}
              label="ปี"
              onChange={handleChange}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {ricecrop.map((year, index) => (
                <MenuItem key={index} value={year.year}>
                  {year.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <div className="mb-4 " align="right">
            <AddRicecrop idFarmer={idAsInt} />
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 650 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับที่</TableCell>
                    <TableCell>ปี</TableCell>
                    <TableCell>วันที่ปลูก</TableCell>
                    <TableCell>วันที่เก็บเกี่ยว</TableCell>
                    <TableCell>พันธ์ุข้าว</TableCell>
                    <TableCell>พื้นที่ (ไร่)</TableCell>
                    <TableCell>รายรับ</TableCell>
                    <TableCell>รายจ่าย</TableCell>
                    <TableCell>รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ricecrop
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.year}</TableCell>
                          <TableCell>{formatDate(row.startDate)}</TableCell>
                          <TableCell>{formatDate(row.endDate)}</TableCell>
                          <TableCell>{row.riceVarietie}</TableCell>
                          <TableCell>{row.area}</TableCell>
                          <TableCell>
                            <AddIncome
                              idFarmer={row.farmerID}
                              idRicecrop={row.id}
                            />
                          </TableCell>
                          <TableCell>
                            <AddExpense
                              idFarmer={row.farmerID}
                              idRicecrop={row.id}
                            />
                          </TableCell>
                          <TableCell>
                            <Link to={`/RicecropDetail/${idAsInt}/${row.id}`}>
                              <Button variant="outlined" size="small">
                                <RemoveRedEyeIcon />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={ricecrop.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Ricecrop;
