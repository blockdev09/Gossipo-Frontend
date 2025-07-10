import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { ImageTransform } from "../../lib/feature";

const AvatarComp = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={ImageTransform(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "2.5rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarComp;
