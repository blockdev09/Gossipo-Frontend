// import React, { memo } from "react";
// import { Link } from "../styles/StyledComponents";
// import { Box, Stack, Typography } from "@mui/material";
// import AvatarComp from "./AvatarComp";
// const Items = ({
//   avatar,
//   name,
//   _id,
//   groupchat = false,
//   samesender,
//   isonline,
//   newmessage,
//   index = 0,
//   deletechats,
// }) => {
//   return (
//     <Link
//       sx={{
//         padding: "0",
//         textDecoration:"none"
//       }}
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => deletechats(e, _id, groupchat)}
//     >
//       <div
//         style={{
//           display: "flex",
//           gap: "1rem",
//           alignItems: "center",
//           padding: "1rem",
//           // backgroundColor: samesender ? "black" : "unset",
//           // color: samesender ? "white" : "unset",
//           position: "relative",
//         }}
//       >
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={4}
//           alignItems="center"
//         >
//           <AvatarComp avatar={avatar} />
//           <Stack>
//             <Typography>{name}</Typography>
//             {newmessage && (
//               <Typography>{newmessage.count} New Messages</Typography>
//             )}
//           </Stack>
//         </Stack>
//         {isonline && (
//           <Box
//             sx={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "green",
//               position: "absolute",
//               top: "50%",
//               right: "1rem",
//               transform: "translateY(-50%)",
//             }}
//           />
//         )}
//       </div>
//     </Link>
//   );
// };

// export default memo(Items);

import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarComp from "./AvatarComp";
import { motion } from "framer-motion";
const Items = ({
  avatar,
  name,
  _id,
  groupChat = false,
  samesender,
  isonline,
  newmessage,
  index = 0,
  deletechats,
}) => {
  // console.log(isonline);

  return (
    <Link
      sx={{
        padding: "0",
        textDecoration: "none",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => deletechats(e, _id, groupChat)}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: "-50%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        viewport={{ once: true }}
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "0.8rem 1rem",
          borderRadius: "12px",
          backgroundColor: samesender ? "#333" : "transparent",
          color: samesender ? "#fff" : "#ccc",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#2a2a2a",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <AvatarComp avatar={avatar} />
          <Stack spacing={0.3}>
            <Typography fontWeight={600} fontSize="0.95rem" color="inherit">
              {name}
            </Typography>
            {newmessage && (
              <Typography fontSize="0.75rem" color="#aaa">
                {newmessage.count} New Message{newmessage.count > 1 ? "s" : ""}
              </Typography>
            )}
          </Stack>
        </Stack>

        {isonline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "limegreen",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              boxShadow: "0 0 8px limegreen",
              animation: "pulse 1.2s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.3)", opacity: 0.6 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default memo(Items);
