import React, { useState } from "react";
import { Modal, IconButton, Box, Fade, Backdrop, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Award, ExternalLink } from "lucide-react";

const Certificate = ({ ImgSertif, Title, Issuer, Date, Link }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      {/* Main Card Container */}
      <Box
        className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
            "& .overlay": {
              opacity: 1,
            },
            "& .hover-content": {
              transform: "translate(-50%, -50%)",
              opacity: 1,
            },
            "& .certificate-image": {
              filter: "contrast(1.05) brightness(1) saturate(1.1)",
            },
          },
        }}
      >
        {/* Thumbnail Container */}
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 1,
            },
          }}
        >
          <img
            className="certificate-image"
            src={ImgSertif}
            alt={Title || "Certificate"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
              transition: "filter 0.3s ease",
            }}
            onClick={handleOpen}
            loading="lazy"
          />
        </Box>

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleOpen}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon
              sx={{
                fontSize: 40,
                mb: 1,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Ver Certificado
            </Typography>
          </Box>
        </Box>

        {/* Certificate Info */}
        <Box sx={{ mt: 3 }}>
          <div className="flex items-start gap-3">
            <Award className="w-6 h-6 text-[#a855f7]" />
            <div>
              <h3 className="text-lg font-bold text-white">{Title}</h3>
              <p className="text-gray-400 text-sm">{Issuer}</p>
              <p className="text-gray-500 text-xs">{Date}</p>
              {Link && (
                <a
                  href={Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#a855f7] hover:text-[#6366f1] transition-colors mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver en plataforma
                </a>
              )}
            </div>
          </div>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(5px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
            m: 0,
            p: 0,
            outline: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              zIndex: 1,
              padding: 1,
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.8)",
                transform: "scale(1.1)",
              },
            }}
            size="large"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>

          <img
            src={ImgSertif}
            alt={Title || "Certificate Full View"}
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "90vh",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
