import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  font-family: Arial, sans-serif;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
  padding: 20px;
  width: 200px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  cursor: pointer;
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-5px);
  }
`;

export const Detail = styled.p`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  transition: color 0.3s;

  ${Menu}:hover & {
    color: white;
  }
`;
