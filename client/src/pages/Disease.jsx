import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Disease = () => {
  const { idFarmer } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

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
          const diseaseResponse = await axios.get(`/api/disease/getAlldisease`);
          setData(diseaseResponse.data);
          setSearch(diseaseResponse.data)
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
  }, []);

  const handleSearchChange = (event) => {
    setSearch(data.filter((f) => f.name.includes(event.target.value)));
  };

  return (
    <div className="flex bg-gray-100">
      <div className="basis-[16%]">
        <Sidebar idFarmer={idAsInt} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-4 py-2 pt-16 mt-3">
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="ค้นหา"
                variant="filled"
                onChange={handleSearchChange}
              />
            </Box>
          </div>
          {search.map((disease, index) => (
            <div className="bg-white p-4 flex shadow-md mt-3 mb-3" key={index}>
              <div>
                <img src={disease.img} alt="" className="w-[200px] h-[150px]" />
              </div>
              <div className="ml-[30px]">
                <div className="text-xl mb-2">{disease.name}</div>
                <div className="mb-4">{disease.product}</div>
                <div>
                  <Link to={`/diseaseDetail/${idFarmer}/${disease.id}`}>
                    <Button variant="contained">ดูข้อมูล</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Disease;