import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/api";
import MemberList from "../components/members/MemberList";
import * as S from "./Members.Styled";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");

  const getMembers = async () => {
    try {
      const response = await axiosInstance.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const onReset = () => {
    setName("");
    setCity("");
    setStreet("");
    setZipcode("");
  };

  const addMembers = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/members/", {
        name,
        address: {
          city: city,
          street: street,
          zipcode: zipcode,
        },
      });
      getMembers();
      onReset();
    } catch (error) {
      console.log("회원 등록 오류 발생");
    }
  };

  const [id, setID] = useState("");
  const [aMember, setAMember] = useState(null);

  const getAMember = async () => {
    try {
      const response = await axiosInstance.get(`/members/${id}`);
      setAMember(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching item:", error); // 추가된 콘솔 출력
      setError("해당 ID의 회원을 찾을 수 없습니다.");
      setAMember(null);
    }
  };

  const modifyMember = async () => {
    try {
      await axiosInstance.patch(`/members/${id}/`, {
        name,
        address: {
          city: city,
          street: street,
          zipcode: zipcode,
        },
      });
      getMembers();
      onReset();
    } catch (error) {
      console.error("Error modifying member:", error);
      setError("회원정보 수정에 실패했습니다.");
    }
  };

  const deleteMember = async () => {
    try {
      await axiosInstance.delete(`/members/${id}`);
      setError("");
      setAMember(null);
      getMembers();
      onReset();
    } catch (error) {
      console.error("Error deleting member:", error);
      setError("회원 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <S.Container>
      <S.Box>
        <S.FormSection>
          <h2>회원 등록하기</h2>
          <S.Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <S.Input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <S.Input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <S.Input
            type="text"
            placeholder="Zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <S.Button type="submit" onClick={addMembers}>
            회원 등록
          </S.Button>
        </S.FormSection>
      </S.Box>
      <S.Box>
        <S.FormSection>
          <h2>ID로 회원 조회하기</h2>
          <S.Input
            type="text"
            placeholder="회원 ID"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />

          <S.Button onClick={getAMember}>회원 조회</S.Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {aMember && (
            <S.MemberDetails>
              <h3>Member Details</h3>
              <p>Name: {aMember.name}</p>
              <p>City: {aMember.address.city}</p>
              <p>Street: {aMember.address.street}</p>
              <p>Zipcode: {aMember.address.zipcode}</p>
            </S.MemberDetails>
          )}
        </S.FormSection>

        {aMember && (
          <S.FormSection>
            <h2>회원 정보 수정</h2>
            <S.Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <S.Input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <S.Input
              type="text"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <S.Input
              type="text"
              placeholder="Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <S.Button onClick={modifyMember}>수정하기</S.Button>
          </S.FormSection>
        )}

        {aMember && (
          <S.FormSection>
            <h2>회원 삭제</h2>
            <S.Button onClick={deleteMember}>삭제하기</S.Button>
          </S.FormSection>
        )}
      </S.Box>

      <S.MemberListContainer>
        <h2>전체 회원 조회하기</h2>
        <S.MemberDetails>
          {members.length > 0 ? (
            <MemberList members={members} />
          ) : (
            <p>조회 가능한 회원이 없습니다.</p>
          )}
        </S.MemberDetails>
      </S.MemberListContainer>
    </S.Container>
  );
};

export default Members;
