import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(100% - 24px); /* Adjust width based on padding and border */
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

export const OrderListContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f1f1f1;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const SubTitle = styled.span`
  font-size: 22px;
  font-family: sans-serif;
  font-weight: 900;
  margin-bottom: 3px;
`;

export const Content = styled.span`
  font-weight: 800;
  color: #8d8d8d;
  font-size: 18px;
`;

export const Content2 = styled(Content)`
  color: #329fff;
`;

export const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

export const OrderContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
`;
