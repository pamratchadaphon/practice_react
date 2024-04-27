import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Sidebar from "../components/Sidebar";
import UserContext from "../UserContext";

const Ricecrop = () => {
  const [data, setData] = useState([]);
  const [databyID, setDatabyID] = useState([]);
  const { id } = useParams();
  const idAsInt = Number(id);
  const [farmer, setFarmer] = useState([]);
  const [farmerbyID, setFarmerbyID] = useState({});

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
          const ricecropResponse = await axios.get(
            "/api/ricecrop/getAllRicecrop",
            config
          );
          setData(ricecropResponse.data);
          const farmerResponse = await axios.get(
            "/api/farmer/getFarmers",
            config
          );
          setFarmer(farmerResponse.data);
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
  }, []);

  useEffect(() => {
    const filteredData = data.filter((farmer) => farmer.farmerID === idAsInt);
    setDatabyID(filteredData);
    const nameFarmer = farmer.filter((farmer) => farmer.id === idAsInt);
    setFarmerbyID(nameFarmer);
  }, [data, idAsInt, farmer]);

  // ฟังก์ชันสำหรับการแปลงวันที่ให้เป็นรูปแบบ "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <UserContext.Provider
      value={{ fname: farmerbyID[0]?.fname, lname: farmerbyID[0]?.lname }}
    >
      <div className="flex">
        <div className="basis-[16%] h-[100vh]">
          <Sidebar
            idFarmer={idAsInt}
            fname={farmerbyID[0]?.fname}
            lname={farmerbyID[0]?.lname}
          />
        </div>
        <div className="basis-[84%] border">
          <div className="px-[30px] py-[30px]">
            <Link
              className="btn btn-secondary"
              style={{ float: "right" }}
              to={`/CreateRicecrop/${id}`}
            >
              สร้างรอบการปลูกข้าว
            </Link>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">รหัสรอบการปลูก</th>
                  <th className="text-center">ปี</th>
                  <th className="text-center">วันที่ปลูก</th>
                  <th className="text-center">วันที่เก็บเกี่ยว</th>
                  <th className="text-center">พันธ์ุข้าว</th>
                  <th className="text-center">พื้นที่ปลูก (ไร่)</th>
                  <th className="text-center">เพิ่มรายรับ</th>
                  <th className="text-center">เพิ่มรายจ่าย</th>
                  <th className="text-center">ดูรายละเอียด</th>
                  {/* <th className="text-center">รหัสเกษตรกร</th> */}
                </tr>
              </thead>
              <tbody>
                {databyID.map((ricecrop) => (
                  <tr key={uuid()}>
                    <td className="text-center">{ricecrop.id}</td>
                    <td className="text-center">{ricecrop.year}</td>
                    <td className="text-center">
                      {formatDate(ricecrop.startDate)}
                    </td>
                    <td className="text-center">
                      {formatDate(ricecrop.endDate)}
                    </td>
                    <td className="text-center">{ricecrop.riceVarietie}</td>
                    <td className="text-center">{ricecrop.area}</td>
                    <td className="text-center">
                      <Link
                        className="btn btn-success"
                        to={`/Income/${idAsInt}/${ricecrop.id}`}
                      >
                        รายรับ
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link
                        className="btn btn-danger"
                        to={`/Expense/${idAsInt}/${ricecrop.id}`}
                      >
                        รายจ่าย
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link
                        className="btn btn-primary"
                        to={`/RicecropDetail/${idAsInt}/${ricecrop.id}`}
                      >
                        ดูรายละเอียด
                      </Link>
                    </td>
                    {/* <td className="text-center">{ricecrop.farmerID}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Ricecrop;
