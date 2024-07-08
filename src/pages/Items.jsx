import React, { useEffect, useState } from "react";
import * as S from "./Items.Styled";
import { axiosInstance } from "../api/api";
import ItemList from "../components/items/ItemList";

const Items = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setID] = useState("");
  const [anItem, setAnItem] = useState(null);
  const [error, setError] = useState("");

  const getItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItems = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/items/", {
        item_name: name,
        stock_quantity: quantity,
        item_price: price,
      });
      getItems();
      onReset();
    } catch (error) {
      console.error("Error adding item:", error);
      setError("상품 등록에 실패했습니다.");
    }
  };

  const getAnItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(`/items/${id}`);
      setAnItem(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching item details:", error);
      setError("해당 ID의 상품을 찾을 수 없습니다.");
      setAnItem(null);
    }
  };

  const modifyItem = async () => {
    try {
      await axiosInstance.patch(`/items/${id}/`, {
        item_name: name,
        stock_quantity: quantity,
        item_price: price,
      });
      setError("");
      setAnItem(null);
      getItems();
      onReset();
    } catch (error) {
      console.error("Error modifying item:", error);
      setError("상품 수정에 실패했습니다.");
    }
  };

  const deleteItem = async () => {
    try {
      await axiosInstance.delete(`/items/${id}`);
      setError("");
      setAnItem(null);
      getItems();
      onReset();
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("상품 삭제에 실패했습니다.");
    }
  };

  const onReset = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setID("");
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <S.Container>
      <S.Box>
        <S.FormSection>
          <h2>상품 등록</h2>
          <S.Input
            type="text"
            placeholder="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <S.Input
            type="number"
            placeholder="가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <S.Input
            type="number"
            placeholder="수량"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <S.Button onClick={addItems}>등록하기</S.Button>
        </S.FormSection>
      </S.Box>

      <S.Box>
        <S.FormSection>
          <h2>상품 조회</h2>
          <S.Input
            type="text"
            placeholder="상품 ID"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
          <S.Button onClick={getAnItem}>조회하기</S.Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {anItem && (
            <S.ItemDetails>
              <h3>상품 상세 정보</h3>
              <p>상품명: {anItem.item_name}</p>
              <p>가격: {anItem.item_price}</p>
              <p>수량: {anItem.stock_quantity}</p>
            </S.ItemDetails>
          )}
        </S.FormSection>

        {anItem && (
          <S.FormSection>
            <h2>상품 수정</h2>
            <S.Input
              type="text"
              placeholder="상품명"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <S.Input
              type="number"
              placeholder="가격"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <S.Input
              type="number"
              placeholder="수량"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <S.Button onClick={modifyItem}>수정하기</S.Button>
          </S.FormSection>
        )}

        {anItem && (
          <S.FormSection>
            <h2>상품 삭제</h2>
            <S.Button onClick={deleteItem}>삭제하기</S.Button>
          </S.FormSection>
        )}
      </S.Box>

      <S.ItemListContainer>
        <h2>전체 상품 목록</h2>
        <S.ItemDetails>
          {items.length > 0 ? (
            <ItemList items={items} />
          ) : (
            <p>등록된 상품이 없습니다.</p>
          )}
        </S.ItemDetails>
      </S.ItemListContainer>
    </S.Container>
  );
};

export default Items;
