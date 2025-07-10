// import { Box, Typography } from "@mui/material";
// import moment from "moment";
// import React, { memo } from "react";
// import { fileFormat } from "../../lib/feature";
// import Render from "./Render";
// const MessageComp = ({ message, user }) => {
//   const { attachments = [], content, sender, createdAt } = message;
//   const isSameSender = sender?._id === user?._id;
//   const time = moment(createdAt).fromNow();
//   // console.log(attachments);

//   return (
//     <div
//       style={{
//         alignSelf: isSameSender ? "flex-end" : "flex-start",
//         backgroundColor: "white",
//         color: "black",
//         borderRadius: "5px",
//         padding: "0.5rem",
//         width: "fit-content",
//       }}
//     >
//       {!isSameSender && (
//         <Typography fontWeight={"600"} variant="caption">
//           {sender.name}
//         </Typography>
//       )}
//       {content && <Typography>{content}</Typography>}
//       {attachments.length > 0 &&
//         attachments.map((i, index) => {
//           const url = i.url;
//           const file = fileFormat(url);
//           console.log(attachments);
//           return (
//             <Box key={index}>
//               <a
//                 href={url}
//                 target="_blank"
//                 download
//                 style={{
//                   color: "black",
//                 }}
//               >
//                 {Render(file, url)}
//               </a>
//             </Box>
//           );
//         })}
//       <Typography variant="caption" color={"text.secondary"}>
//         {time}
//       </Typography>
//     </div>
//   );
// };

// export default memo(MessageComp);

import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/feature";
import Render from "./Render";
import {motion} from "framer-motion"

const MessageComp = ({ message, user }) => {
  const { attachments = [], content, sender, createdAt } = message;
  const isSameSender = sender?._id === user?._id;
  // console.log(isSameSender);

  const time = moment(createdAt).fromNow();
  // console.log(message);

  return (
    <Box
      sx={{
        alignSelf: isSameSender ? "flex-end" : "flex-start",
        background: isSameSender
          ? "rgba(59, 130, 246, 0.2)"
          : "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(6px)",
        color: "#f1f1f1",
        borderRadius: "1rem",
        padding: "0.75rem 1rem",
        maxWidth: "75%",
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        marginBottom: "0.5rem",
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      {!isSameSender && (
        <Typography
          fontWeight="600"
          variant="caption"
          sx={{ color: "#b3b3b3" }}
        >
          {sender.name}
        </Typography>
      )}

      {content && (
        <Typography sx={{ color: "#e0e0e0", mt: 0.5 }}>{content}</Typography>
      )}

      {attachments.length > 0 &&
        attachments.map((i, index) => {
          const url = i.url;
          const file = fileFormat(url);
          return (
            <Box key={index} sx={{ mt: 1 }}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "#90caf9",
                  textDecoration: "none",
                }}
              >
                {Render(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography
        variant="caption"
        sx={{ color: "#999", display: "block", mt: 1 }}
      >
        {time}
      </Typography>
    </Box>
  );
};

export default memo(MessageComp);
