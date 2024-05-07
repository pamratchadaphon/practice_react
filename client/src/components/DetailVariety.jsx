import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};

export default function BasicModal({ id }) {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/variety/getVariety/${id}`);
      setData(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        ดูข้อมูล
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ข้อมูลทั่วไป
          </Typography>

          <div className="flex mt-3">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ชื่อพันธุ์
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.name}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                คุณสมบัติ
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.feature}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ความไวต่อแสง
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.sensitivity}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                อายุ
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.age}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ความนุ่มนวล
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.softness}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ผลผลิต
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.product}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ความมั่นคง
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.stability}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ข้อควรระวัง
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.warning}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                ลักษณะเด่น
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.strength}
              </Typography>
            </div>
          </div>

          <div className="mt-3" align="right">
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleClose()}
            >
              close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
