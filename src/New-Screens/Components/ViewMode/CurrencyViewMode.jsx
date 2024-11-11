import React from "react";
import styled from "styled-components";
import LargeButton from "../../../components/buttons/LargeButton";

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 45vw;
`;
const CurrencyName = styled.div`
  font-size: 22px;
  color: #464f60;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;
const CurrencySection = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 125px; */
`;
const Sign = styled.div`
  font-size: 22px;
  color: #464f60;
  font-weight: bold;
`;
const FullForm = styled.div`
  font-size: 14px;
  color: #6a727f;
`;
const DefultSection = styled.div`
  margin: 20px 0;
`;
const Title = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #58606f;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 280px; /* Increase width */
  margin: 10px 0;
`;
const Text = styled.div`
  color: #90959f;
  font-size: 12px;
  width: 110px; /* Increase to match the image */
`;
const Answer = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #6a727f;
  text-align: center;
  flex-grow: 1; /* Ensures it takes up remaining space */
`;
const Checkbox = styled.input`
  flex-grow: 1;
`;

const GLaccoung = styled.div`
  margin: 20px 0;
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px; /* Increase width */
  margin: 10px 0;
`;
const Text2 = styled.div`
  color: #90959f;
  font-size: 12px;
  width: 170px; /* Increase to match the image */
`;

const Wrap3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 240px; /* Increase width */
  margin: 10px 0;
`;
const Answer2 = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #6a727f;
  text-align: left;
  flex-grow: 1; /* Ensures it takes up remaining space */
`;

const Wrapit = styled.div``;

const CurrencyViewMode = ({ RowData }) => {
  console.log(RowData, "d32cewv");

  const email = localStorage.getItem("email");
  console.log(RowData.realizedGainLossAccount);

  return (
    <Wrapper>
      <Wrapit>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <CurrencySection>
            <CurrencyName>
              {RowData?.code || "-"}
              <Sign>{RowData?.sign || "-"}</Sign>
            </CurrencyName>
            <FullForm>{RowData?.currencyName || "-"}</FullForm>
          </CurrencySection>
          <LargeButton name={"Active"} />
        </div>
        <DefultSection>
          <Title>CURRENCY DEFAULT</Title>
          <Wrap3>
            <Text>Is default Currency?</Text>
            <Checkbox type="checkbox" alt="cwecwe" />
          </Wrap3>
          <Wrap3>
            <Text>Decimal Places</Text>
            <Answer>{RowData?.decimalPlaces || "-"}</Answer>
          </Wrap3>
          <Wrap3>
            <Text>Round Off</Text>
            <Answer>{RowData?.roundOff || "-"}</Answer>
          </Wrap3>
        </DefultSection>
        <GLaccoung>
          <Title>GL ACCOUNT</Title>
          <Wrap2>
            <Text2>Realized Gain/Loss Account</Text2>
            <Answer2>{RowData?.realizedGainLossAccount || "-"}</Answer2>
          </Wrap2>
          <Wrap2>
            <Text2>Unrealized Gain/Loss Account</Text2>
            <Answer2>{RowData?.unrealizedGainLossAccount || "-"}</Answer2>
          </Wrap2>
        </GLaccoung>
      </Wrapit>
      <div>
        <Title>LAST ACTIVITY</Title>
        <Wrap>
          <Text>Last Update</Text>
          <Answer2>Yes</Answer2>
        </Wrap>
        <Wrap>
          <Text>User</Text>
          <Answer2>{email}</Answer2>
        </Wrap>
      </div>
    </Wrapper>
  );
};

export default CurrencyViewMode;
