import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const VarietyDetail = () => {
  const { idFarmer, idDisease } = useParams();
  const idAsInt = Number(idFarmer);
  const [data, setData] = useState({});

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
            `/api/disease/getOneDisease/${idDisease}`
          );
          const data = varietyResponse.data;
          setData(data);
        } else {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (error) {}
    };
    fetchData();
  }, [idDisease]);

  return (
    <div className="flex bg-gray-100">
      <div className="basis-[16%]">
        <Sidebar idFarmer={idAsInt} />
      </div>
      <div className="basis-[84%] border">
        <div className="px-10 py-2 pt-16 mt-3">
          <div className="text-center text-2xl">{data.name}</div>
          <div className="text-center mt-4 mb-4">
            <div className="flex justify-center items-center">
              <img src={data.img} alt="" width={"300px"} />
            </div>
          </div>


          <div className="flex mt-2">
            <div>
              <label htmlFor="" className="w-[200px]">
                อาการ
              </label>
            </div>
            <div className="">
              <label className="">{data.symptom}</label>
            </div>
          </div>
          <hr />

          <div className="flex mt-2">
            <div>
              <label htmlFor="" className="w-[200px]">
                การป้องกันกำจัด
              </label>
            </div>
            <div className="">
              <label className="">{data.prevention}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarietyDetail;
