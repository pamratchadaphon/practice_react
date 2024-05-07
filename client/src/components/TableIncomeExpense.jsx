import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import TotalIncomeExpense from "./TotalIncomeExpense";
import EditIncomeExpense from "./EditIncomeExpense";
import DeleteIncomeExpense from "./DeleteIncomeExpense";

const TableIncomeExpense = ({ idRicecrop, search, selectMonth, type }) => {
  const [row, setRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const month = (date) => {
    const d = new Date(date);
    const m = d.getMonth() + 1;
    return m + "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/ricecrop/getRicecropIncomeExpense/${idRicecrop}`
      );
      const sortedData = res.data[0].IncomeExpense.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      const searchData = sortedData.filter(
        (data) =>
          data.detail.includes(search) &&
          data.type.includes(type) &&
          month(data.date).includes(selectMonth)
      );

      let totalIncome = 0;
      let totalExpense = 0;
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i].type === "รายรับ") {
          totalIncome += searchData[i].price;
        } else {
          totalExpense += searchData[i].price;
        }
      }
      setRow(searchData);
      setTotalIncome(totalIncome);
      setTotalExpense(totalExpense);
    };
    fetchData();
  }, [idRicecrop, search, type, selectMonth]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <div>
      <div>
        <TotalIncomeExpense
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>
      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>วันที่</TableCell>
                  <TableCell>รายการ</TableCell>
                  <TableCell>ราคา (บาท)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, i) => (
                    <TableRow hover tabIndex={-1} key={i}>
                      <TableCell>{formatDate(data.date)}</TableCell>
                      <TableCell>{data.detail}</TableCell>
                      <TableCell> {data.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex">
                          <div>
                            <EditIncomeExpense id={data.id} />
                          </div>
                          <div>
                            <DeleteIncomeExpense id={data.id} detail={data.detail} type={data.type}/>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={row.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default TableIncomeExpense;
