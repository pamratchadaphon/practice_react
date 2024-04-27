import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const VarietyDetail = () => {
  const { idFarmer, idVariety } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState({})

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
            `/api/variety/getVariety/${idVariety}`
          );
          const data = varietyResponse.data
          setData(data)
        } else {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {}
    };
    fetchData();
  },[idVariety]);

  return (
    <div className="flex bg-gray-100">
      <div className="basis-[16%]">
        <Sidebar idFarmer={idAsInt} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-10 py-2 pt-16 mt-3">
          <div className="text-center text-2xl">พันธุ์{data.name}</div>
          <div className="text-center mt-4 mb-4">
            <div className="flex justify-center items-center">
              <img
                src={data.img}
                alt=""
                width={"300px"}
              />
            </div>
          </div>

          <label className="text-red-500">ข้อมูลทั่วไปของผลิตภัณฑ์</label>
          <div className="flex mt-3">
            <label htmlFor="" className="flex-1">
              คุณสมบัติ
            </label>
            <label className="text-right flex-1">{data.feature}</label>
          </div>
          <hr />

          <div className="flex mt-2">
            <label htmlFor="" className="flex-1">
              ความไวแสง
            </label>
            <label className="text-right flex-1">{data.sensitivity}</label>
          </div>
          <hr />

          <div className="flex mt-2">
            <label htmlFor="" className="flex-1">
              อายุ
            </label>
            <label className="text-right flex-1">{data.age}</label>
          </div>
          <hr />

          <div className="flex mt-2">
            <label htmlFor="" className="flex-1">
              ความนุ่มนวล
            </label>
            <label className="text-right flex-1">{data.softness}</label>
          </div>

          <hr />
          <div className="flex mt-2">
            <label htmlFor="" className="flex-1">
              ผลผลิต
            </label>
            <label className="text-right flex-1">{data.product}</label>
          </div>

          <hr />
          <div className="flex mt-2">
            <label htmlFor="" className="flex-1">
              ความมั่นคง
            </label>
            <label className="text-right flex-1">{data.stability}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarietyDetail;
