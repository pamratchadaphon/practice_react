import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DetailDisease from "../components/DetailDisease"

const Disease = () => {
  const { idFarmer } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");

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
          const farmerResponse = await axios.get(`/api/farmer/${idAsInt}`);
          setFirstName(farmerResponse.data.fname);
          setLastName(farmerResponse.data.lname);
          setData(diseaseResponse.data);
          setSearch(diseaseResponse.data);
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
      <Navbar idFarmer={idAsInt} fname={fname} lname={lname} />

      <div className="mx-32 py-2 pt-16 mt-3">
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
              variant="outlined"
              onChange={handleSearchChange}
            />
          </Box>
        </div>
        <div>
          {search.map((disease, index) => (
            <div className="bg-white p-4 flex shadow-md mt-3 mb-3" key={index}>
              <div className="ml-[30px]">
                <div className="text-xl mb-2">{disease.name}</div>
                <div className="mb-4">{disease.product}</div>
                <div>
                  <DetailDisease id={disease.id}/>
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
