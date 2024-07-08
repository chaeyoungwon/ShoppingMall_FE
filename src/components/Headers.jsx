import React from "react";
import * as S from "./Headers.Styled";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  return (
    <>
      <S.Title
        onClick={() => {
          navigate("/");
        }}
      >
        Shopping Mall
      </S.Title>
    </>
  );
};
export default Headers;
