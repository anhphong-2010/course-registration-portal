import React from "react";
import { Cube } from "styled-loaders-react";
import "./Loading.scss";
export default function Loading() {
  return (
    <div className="loader">
      <Cube color="#ec5252" size="70px" />
    </div>
  );
}
