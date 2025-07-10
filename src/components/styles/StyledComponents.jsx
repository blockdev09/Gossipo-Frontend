import { styled } from "@mui/material";
import { Link as Linkcomponent } from "react-router-dom";
export const VisuallyHiddenInput = styled("input")({
  border: "0",
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1",
});
export const Link = styled(Linkcomponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const Inputbox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: #292a2e;
`;

// Responsive SearchField
export const SearchField = styled("input")(({ theme }) => ({
  padding: "1rem 2rem",
  width: "20vmax",
  minWidth: "200px",
  maxWidth: "100%",
  border: "2px solid transparent",
  outline: "none",
  borderRadius: "1.5rem",
  color: "white",
  backgroundColor: "#1f1f1f",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  // borderColor: "#00fff7",
  // boxShadow: "0 0 10px #00fff7, 0 0 10px #00fff7",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0.8rem 1rem",
    fontSize: "1rem",
  },
}));

// Responsive CurveButton
export const CurveButton = styled("button")(({ theme }) => ({
  borderRadius: "1.5rem",
  padding: "1rem 2rem",
  border: "none",
  outline: "none",
  cursor: "pointer",
  backgroundColor: "black",
  color: "white",
  fontSize: "1rem",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0.8rem 1rem",
    fontSize: "0.95rem",
  },
}));
