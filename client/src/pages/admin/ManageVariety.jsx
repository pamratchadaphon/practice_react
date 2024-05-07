import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";

const ManageVariety = () => {
  const [data, setData] = useState([]);
  const config = {
    title: "ยืนยันการลบข้อมูลพันธุ์ข้าว",
  };

  const [modal, contextHolder] = Modal.useModal();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/variety/getAllVarietys`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function deleteVariety(idVariety) {
    const deleteDataVariety = async () => {
      try {
        await axios.delete(`/api/variety/deleteVariety/${idVariety}`);
        const dataNew = await axios.get(`/api/variety/getAllVarietys`);
        setData(dataNew.data);
        message.success("Delete success!");
      } catch (error) {
        console.log(error);
      }
    };
    deleteDataVariety();
  }

  return (
    <div className="flex bg-gray-100">
      <div className="basis-[16%]">
        <SidebarAdmin />
      </div>
      <div className="basis-[84%] border">
        <div className="px-4 py-2 pt-16 mt-3">
          <div className="mb-3 ">
            <Link to={"/AddVariety"}>
              <Button variant="contained">เพิ่ม</Button>
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>รหัสรอบการปลูก</StyledTableCell>
                  <StyledTableCell>ชื่อพันธุ์ข้าว</StyledTableCell>
                  <StyledTableCell>คุณสมบัติ</StyledTableCell>
                  <StyledTableCell>ความไวแสง</StyledTableCell>
                  <StyledTableCell>อายุ</StyledTableCell>
                  <StyledTableCell>ความนุ่มนวล</StyledTableCell>
                  <StyledTableCell>ผลผลิต</StyledTableCell>
                  <StyledTableCell>ความมั่นคง</StyledTableCell>
                  <StyledTableCell>แก้ไข</StyledTableCell>
                  <StyledTableCell>ลบ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((variety, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{variety.id}</StyledTableCell>
                    <StyledTableCell>{variety.name}</StyledTableCell>
                    <StyledTableCell>{variety.feature}</StyledTableCell>
                    <StyledTableCell>{variety.sensitivity}</StyledTableCell>
                    <StyledTableCell>{variety.softness}</StyledTableCell>
                    <StyledTableCell>{variety.age}</StyledTableCell>
                    <StyledTableCell>{variety.product}</StyledTableCell>
                    <StyledTableCell>{variety.stability}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        className="MuiButton-contained MuiButton-containedWarning"
                      >
                        <EditIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        className="MuiButton-contained MuiButton-containedError"
                      >
                        <DeleteOutlineIcon
                          onClick={() => {
                            modal.confirm(config).then((confirmed) => {
                              if (confirmed) {
                                deleteVariety(variety.id);
                              }
                            });
                          }}
                        />
                        {contextHolder}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ManageVariety;
