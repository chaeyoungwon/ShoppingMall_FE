import * as S from "./Home.Styled";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <S.Container>
        <S.Menu
          onClick={() => {
            navigate("/items");
          }}
        >
          Items
          <S.Detail>상품 등록과 조회, 재고 관리 등</S.Detail>
        </S.Menu>
        <S.Menu
          onClick={() => {
            navigate("/members");
          }}
        >
          Members
          <S.Detail>사용자 등록과 조회</S.Detail>
        </S.Menu>
        <S.Menu
          onClick={() => {
            navigate("/orders");
          }}
        >
          Orders
          <S.Detail>주문 등록과 조회</S.Detail>
        </S.Menu>
      </S.Container>
    </>
  );
};
export default Home;
