import { FileOpen } from "@mui/icons-material";
import React from "react";
import { ImageTransform } from "../../lib/feature";

const Render = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width="200px" controls />;

    case "image":
      return (
        <img
          src={ImageTransform(url, 200)}
          alt="attachment"
          width="200px"
          height="150px"
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;
    default:
      return <FileOpen />;
  }
};

export default Render;
