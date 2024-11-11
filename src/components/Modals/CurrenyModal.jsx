import React, { useState } from "react";
import styled from "styled-components";
import { PiWarningCircleBold } from "react-icons/pi";
import TitleOfSection from "../../New-Screens/Components/TitleOfSection";
import AddButton from "../buttons/AddButton";
import DropdownInput from "../Inputs/DropdownInput";
import HeadlessTableTN from "../../New-Screens/Components/MantineTable/HeadlessTableTN";
import { useSelector } from "react-redux";
import { width } from "@mui/system";

const Wrapper = styled.div`
  background-color: #ffffff;
  width: 722px;
  height: 624px;
  border-radius: 12px;
  position: absolute;
  z-index: 1000;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  padding: 20px;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
`;

const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 900;
  background-color: rgba(150, 149, 149, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 1px 19px 20px black;
`;

const Forex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* margin: 20px 20px; */
`;
const Inputs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;
const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 10px;
  margin-left: 540px;
  width: 12vw;
  /* padding-top: 70px; */
`;

const Button = styled.div`
  font-size: 14px;
  color: ${(props) => (props.primary ? "#ffffff" : "#232222")};
  border: ${(props) => (props.primary ? "none" : "1px solid #cbcbcb")};
  padding: ${(props) => (props.primary ? "11px 0" : "10px 0px")};
  width: 100%;
  text-align: center;
  background-color: ${(props) => (props.primary ? props.btnColor : "#ffffff")};
  border-radius: 8px;
  cursor: pointer;
`;

const CurrencyModal = ({ SaveClick, CancelClick }) => {
  const MonthOptions = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];
  const YearOptions = [
    { label: "2000", value: "2000" },
    { label: "2001", value: "2001" },
    { label: "2002", value: "2002" },
    { label: "2003", value: "2003" },
    { label: "2004", value: "2004" },
    { label: "2005", value: "2005" },
    { label: "2006", value: "2006" },
    { label: "2007", value: "2007" },
    { label: "2008", value: "2008" },
    { label: "2009", value: "2009" },
    { label: "2010", value: "2010" },
  ];

  const [columns, setColumns] = useState([
    {
      accessorKey: "id",
      header: "Day",
    },
    {
      accessorKey: "sign",
      header: "Local Currency",
    },
    {
      accessorKey: "code",
      header: "Rate",
    },
    {
      accessorKey: "currencyName",
      header: "GBP",
    },
    {
      accessorKey: "isDefaultCurrency",
      header: "EURO",
    },
    {
      accessorKey: "decimalPlaces",
      header: "AED",
    },
    {
      accessorKey: "unrealizedGainLossAccount",
      header: "PKR",
      // headerClass: "All-header",
      // cellRenderer: GainValue,
    },
  ]);
  const [rowdata, setRowdata] = useState([]);
  const themeKeys = useSelector((state) => state.localization.themeKeys);
  return (
    <Wrap>
      <Wrapper>
        <Forex>
          <TitleOfSection title={"FOREX GRID DETAILS"} />
          <AddButton title={"New Series"} icon={"AddBlue"} />
        </Forex>
        <Inputs>
          <DropdownInput
            Name={"Select Month"}
            Padding={false}
            setWidth={false}
            Data={MonthOptions}
          />
          <DropdownInput
            Name={"Select Year"}
            Padding={false}
            setWidth={false}
            Data={YearOptions}
          />
        </Inputs>
        <HeadlessTableTN
          columns={columns}
          data={rowdata}
          // showAddNotesButton={true}
          // onAddNotesClick={HandleModal}
          currencyButton={false}
          PeriodButton={false}
          // PeriodClick={() => setModal(true)}
          TitleButton={false}
          titleName={"FISCAL YEARS"}
          // SubRows={(row) => row.subRows}
          // RowData={(row) => setRowBody(row)}
          rowSelection={false}
          expandingRow={false}
          editiing={false}
          setMargin={"None"}
          setTableHeight={false}
          GreyTitle={false}
          TableShadow={true}
          TableBorder={true}
          CustomButtons={true}
          LineUnderTable={true}
          // state={{ rowSelection }}
          // renderExpandButton={() => null}
          //   mantineTableBodyRowProps={mantineTableBodyRowPropsTD}
          // getRowCanExpand={(row) => row.depth === 0}
          // mantineExpandButtonProps={({ row }) =>
          //   row.depth === 0 ? {} : { style: { display: "none" } }
          // }
        />
        <ActionButtons>
          <Button onClick={CancelClick}>Cancel</Button>
          <Button primary btnColor={themeKeys.primary} onClick={SaveClick}>
            Save
          </Button>
        </ActionButtons>
      </Wrapper>
    </Wrap>
  );
};

export default CurrencyModal;
