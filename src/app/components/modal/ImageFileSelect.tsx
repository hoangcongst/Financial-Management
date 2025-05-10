/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconButton,
  Typography,
  Box,
  Modal,
  Button,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import request from "@/util/request";

interface ImageFileSelectProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  input: any;
  setInput: (input: any) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const baseUrl = "http://localhost:2000";

const ImageFileSelect = (props: ImageFileSelectProps) => {
  const { open, setOpen, input, setInput } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = async(event: any) => {
    const token = localStorage.getItem("token");
    const file = event.target.files?.[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("imageFile", file);
    formData.append("id", input.id.toString());

    try {
      const response = await request({
        url: `${baseUrl}/transaction_type/upload_image`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 201) {
        console.log('response', response.data);
        setInput({ ...input, imageFile: response.data.imageUrl });
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            width: "500px",
            height: "400px",
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Xem ảnh
          </Typography>
          <Button
            className="w_100"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {input?.id ? 'Update Image' : 'Upload files'}
            <VisuallyHiddenInput
              type="file"
              onChange={(event: any) => {
                const file = event.target.files?.[0];
                if(!file) return;
                const isUpdate = input?.id;
                
                if(isUpdate) {
                  handleImageUpload(event);
                } else {
                  setInput({ ...input, imageFile: file });
                }
              }}
            />
          </Button>
          {input && (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "250px",
                  overflow: "hidden",
                  mt: 2,
                }}
              >
                <img
                  src={
                    typeof input.imageFile === "string"
                      ? `${baseUrl}/${input.imageFile}`
                      : input.imageFile
                      ? URL.createObjectURL(input.imageFile)
                      : ""
                  }
                  alt="not found"
                  width={"100%"}
                />
                <br /> <br />
              </Box>
              <div className="m_t20 w_100">
                <Button
                  className="w_100"
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setInput({ ...input, imageFile: null })}
                >
                  Remove
                </Button>
                &nbsp;
                <Button
                  className="w_100"
                  variant="outlined"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
export default ImageFileSelect;
