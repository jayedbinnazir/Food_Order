"use client";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import pizza from "../../../public/pizza.png";
import Link from "next/link";

const Cards = () => {
  return (
    <Card
      sx={{
        width: "270px",
        padding: "4px",
        "&:hover": { boxShadow: "10px 10px 10px grey" },
      }}
      elevation={4}
    >
      <Image
        src={pizza}
        alt="pizza"
        style={{
          marginBottom: "15px",
          filter: "drop-shadow(8px 8px 8px grey)",
        }}
        objectFit="contain"
      />
      <hr
        style={{
          margin: "auto",
          marginTop: "2px",
          marginBottom: "1rem",
          padding: "2px",
          width: "90%",
        }}
      />
      <Box mx={"auto"} p={1}>
        <Typography variant="body1" fontWeight={"bold"} gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          quis!
        </Typography>
        <button className="btn btn-sm  px-6   bg-red-500 ">BUY</button>
      </Box>
    </Card>
  );
};

export default Cards;
