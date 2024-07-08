import React, { useEffect, useState } from "react";
import * as S from "./Orders.Styled";
import { axiosInstance } from "../api/api";

const formatDate = (dateString) => {
  //날짜 형식 맞추기
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
  //시간 형식 맞추기
  const date = new Date(dateString);
  const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  return date.toLocaleTimeString(undefined, options);
};

const OrderItem = ({ item }) => (
  <S.Details>
    <span>
      <S.Content2>상품 ID: </S.Content2>
      {item.itemId}
    </span>
    <span>
      <S.Content2>상품 이름: </S.Content2>
      {item.itemName}
    </span>
    <span>
      <S.Content2>주문 수량: </S.Content2>
      {item.count}
    </span>
  </S.Details>
);

const Order = ({ order, number }) => (
  <>
    <S.SubTitle>
      회원 {order.memberId} 의 주문 내역 - {number}
    </S.SubTitle>
    <S.Details>
      <span>
        <S.Content>주문 ID: </S.Content>
        {order.id}
      </span>
      <span>
        <S.Content>주문 날짜 : </S.Content>
        {formatDate(order.orderDate)}
      </span>
      <div>
        {order.item.map((item) => (
          <OrderItem key={item.itemId} item={item} />
        ))}
      </div>
      <S.Divider />
    </S.Details>
  </>
);

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <Order key={order.id} order={order} number={index + 1} />
      ))}
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]); //주문 리스트
  const [anOrder, setAnOrder] = useState(); //특정 주문
  const [memberId, setMemberId] = useState(); //회원 ID
  const [memberId2, setMemberId2] = useState(); //주문 등록 시 사용하는 회원 ID
  const [orderId, setOrderId] = useState(); //주문 ID
  const [itemId, setItemId] = useState(); //상품 ID
  const [itemQuantity, setItemQuantity] = useState(); //상품 수량
  const [error, setError] = useState(null);

  const getOrders = async () => {
    // 회원별 주문 내역 전체 리스트 조회
    try {
      const response = await axiosInstance.get(`/orders?memberId=${memberId}`);
      console.log(orders);
      setOrders(response.data || []);
      setError(null);
    } catch (error) {
      setError("주문 내역이 없습니다.");
    }
  };

  const getOrderById = async () => {
    // 주문 내역 단건 조회
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      setAnOrder(response.data);
      console.log(response.data);
      setError(null);
    } catch (error) {
      setError("주문 내역이 없습니다");
    }
  };

  const addOrders = async () => {
    // 주문 등록
    try {
      await axiosInstance.post("/orders/", {
        memberId: parseInt(memberId2),
        items: [
          {
            itemId: parseInt(itemId),
            itemQuantity: parseInt(itemQuantity),
          },
        ],
      });
      setError(null);
    } catch (error) {
      console.error("주문 요청 중 오류 발생:", error.response.data);
      setError(
        "주문이 정상적으로 처리되지 않았습니다. 상품 수량이 부족하거나 등록되지 않은 ID입니다"
      );
    }
  };

  useEffect(() => {}, [orderId, itemId, memberId, memberId2]);

  return (
    <S.Container>
      <S.FormSection>
        <h2>상품 주문</h2>
        <S.Input
          type="number"
          placeholder="회원 ID"
          value={memberId2}
          onChange={(e) => setMemberId2(e.target.value)}
        />
        <S.Input
          type="number"
          placeholder="상품 ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <S.Input
          type="number"
          placeholder="상품 수량"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <S.Button onClick={addOrders}>주문 추가</S.Button>
      </S.FormSection>

      <S.FormSection>
        <h2>주문 내역 단건 조회</h2>
        <S.Input
          type="text"
          placeholder="주문 ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <S.Button onClick={getOrderById}> 조회</S.Button>

        {anOrder && (
          <S.OrderDetails>
            <S.SubTitle>Order Information</S.SubTitle>
            <div>
              <p>
                <S.Content>주문 ID: </S.Content>
                <span>{anOrder.id}</span>
              </p>
              <p>
                <S.Content>회원 ID: </S.Content>
                <span>{anOrder.memberId}</span>
              </p>
              <p>
                <S.Content>주문 날짜 : </S.Content>
                <span>{formatDate(anOrder.orderDate)}</span>
              </p>
              <p>
                <S.Content>주문 시간 : </S.Content>
                <span>{formatTime(anOrder.orderDate)}</span>
              </p>
              <p>
                <S.Content>주문 상태 : </S.Content>
                <span>{anOrder.status}</span>
              </p>
            </div>
            <S.Divider />
            {(anOrder.item || []).map((item, i) => (
              <S.Details key={i}>
                <div>
                  <p>
                    <S.Content2>상품 ID: </S.Content2>
                    <span>{item.itemId}</span>
                  </p>
                  <p>
                    <S.Content2>상품 이름: </S.Content2>
                    <span>{item.itemName}</span>
                  </p>
                  <p>
                    <S.Content2>주문 수량: </S.Content2>
                    <span>{item.count}</span>
                  </p>
                </div>
              </S.Details>
            ))}
          </S.OrderDetails>
        )}
      </S.FormSection>

      <S.FormSection>
        <h2>회원별 주문 내역 전체 리스트 조회</h2>
        <S.Input
          type="number"
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="회원 ID"
        />
        <S.Button type="submit" onClick={getOrders}>
          조회
        </S.Button>
        <S.OrderDetails>
          {orders.length > 0 ? (
            <OrderList orders={orders} />
          ) : (
            <p>주문 내역이 없습니다.</p>
          )}
        </S.OrderDetails>
      </S.FormSection>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </S.Container>
  );
};

export default Orders;
