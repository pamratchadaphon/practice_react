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
  width: 700,
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

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/disease/getOneDisease/${id}`);
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
                อาการ
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.symptom}
              </Typography>
            </div>
          </div>

          <div className="flex mt-1">
            <div>
              <Typography id="modal-modal-description" sx={{ width: 150 }}>
                การป้องกันกำจัด
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-description">
                {data.prevention}
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
