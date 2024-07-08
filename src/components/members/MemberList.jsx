// components/members/MemberList.js
import React from "react";
import styled from "styled-components";

const MemberContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const MemberList = ({ members }) => {
  return (
    <div>
      {members.map((member) => (
        <MemberContainer key={member.id}>
          <h3>{member.name}</h3>
          <p>memberID: {member.id}</p>
          <p>City: {member.address.city}</p>
          <p>Street: {member.address.street}</p>
          <p>Zipcode: {member.address.zipcode}</p>
        </MemberContainer>
      ))}
    </div>
  );
};

export default MemberList;
