import { Box } from "@mui/material";
import Cards from "./Cards";

const HomeMenue = () => {
  return (
    <Box
      sx={{
        mt: "5px",
        boreder: "2px solid black",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
    </Box>
  );
};

export default HomeMenue;
