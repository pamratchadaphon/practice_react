import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../components/Navbar";
import DetailVariety from "../components/DetailVariety";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

const Variety = () => {
  const { idFarmer } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

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
          const varietyResponse = await axios.get(
            `/api/variety/getAllVarietys`
          );
          const farmerResponse = await axios.get(`/api/farmer/${idAsInt}`);
          setFirstName(farmerResponse.data.fname);
          setLastName(farmerResponse.data.lname);
          setData(varietyResponse.data);
          setSearch(varietyResponse.data);
        } else {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching ricecrop data:", error);
      }
    };
    fetchData();
  }, [idAsInt]);

  const handleSearchChange = (event) => {
    setSearch(data.filter((f) => f.name.includes(event.target.value)));
  };

  return (
    <div className="bg-neutral-100">
      <Navbar idFarmer={idAsInt} fname={fname} lname={lname}></Navbar>
      <div className="mx-32 py-2 pt-16 mt-3">
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "250px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="ค้นหา"
              onChange={handleSearchChange}
            />
          </Box>
        </div>

        <div>
          {search.map((variety, index) => (
            <div className="bg-white p-4 flex shadow-md mt-3 mb-3" key={index}>
              <div className="ml-[30px]">
                <div className="text-xl mb-2">พันธุ์ {variety.name}</div>
                <div className="mb-4">ผลผลิต : {variety.product}</div>
                <div>
                  <DetailVariety id={variety.id} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อพันธุ์</TableCell>
                    <TableCell>ผลผลิต</TableCell>
                    <TableCell>รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {search
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((search,index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell>{search.name}</TableCell>
                          <TableCell>{search.product}</TableCell>
                          <TableCell><DetailVariety id={search.id}/></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={search.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div> */}
      </div>
    </div>
  );
};

export default Variety;
