import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DropdownInput from "../../Inputs/DropdownInput";
import { useSelector } from "react-redux";
import HeadlessTableTN from "../../../New-Screens/Components/MantineTable/HeadlessTableTN";
import RealGain from "../../Table/CustomCells/RealGain";
import { fetchChartOfAccounts, UpdateCurrencyStatus } from "../../../Api/Apis";
import TypeDropdown from "../../Inputs/TableWithPopoverDropdown";
import { SafetyCheck } from "styled-icons/material";
import { Options } from "styled-icons/evaicons-solid";

const Wrapper = styled.div`
  background-color: #ffffff;
  width: 1300px;
  height: 580px;
  border-radius: 12px;
  position: absolute;
  z-index: 1000;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 25px;
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
`;

const Grid = styled.div`
  height: 200px;
  background-color: green;
`;
const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  /* margin: 0 20px; */
`;

const Btn1 = styled.div`
  font-size: 15px;
  color: #232222;
  border: 1px solid #cbcbcb;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 8px;
  width: 50px;
  text-align: center;
  cursor: pointer;
`;

const Btn2 = styled.div`
  font-size: 15px;
  color: #ffffff;
  border: 1px solid #cbcbcb;
  padding: 11px 16px;
  width: 50px;
  text-align: center;
  background-color: #1677ff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const DefineCurrency = ({
  save,
  cancel,
  TableData,
  ReloadPage,
  SuccessToaster,
}) => {
  const themeKeys = useSelector((state) => state.localization.themeKeys);
  const [dropdownValues, setDropdownValues] = useState({});
  const [realizedDropdownValues, setRealizedDropdownValues] = useState({});
  const [checkoxValue, setCheckboxValue] = useState();
  const [decimalValue, setDecimalValue] = useState();
  const [updatedStatus, setUpdatedStatus] = useState();
  const [realizedData, setRealizedData] = useState();
  const [unrealizedData, setUnRealizedData] = useState();
  const [decimalVal, setDecimalVal] = useState();
  const [defaultStatus, setDefaultStatus] = useState();
  const [rowdata, setRowdata] = useState(TableData || []);
  const [updatedDropdown, setUpdatedDropdown] = useState();

  const [data, setData] = useState([
    {
      glaccount: "",
      rowdescription: "",
      debit: "",
      credit: "",
      fcdebit: "",
      fccredit: "",
      taxcode: "",
      taxamount: "",
      totalamount: "",
      fctotalamount: "",
      project: "",
    },
  ]); //

  const [glAccountData, setGlAccountData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchGLAccounts = async () => {
      try {
        const glAccounts = await fetchChartOfAccounts();

        // Filter accounts where isMainAccount is false
        const filteredGlAccounts = glAccounts.filter(
          (account) => account.isMainAccount === false
        );

        // Map the filtered accounts to the desired format
        const formattedGlAccounts = filteredGlAccounts.map((account) => ({
          value: account.accountCode,
          label: account.accountCode,
          description: account.accountName,
        }));

        // Set the filtered and formatted GL Accounts to state
        setGlAccountData(formattedGlAccounts);
      } catch (error) {
        console.error("Error fetching GL Accounts:", error);
      }
    };

    fetchGLAccounts(); // Fetch GL Accounts on component mount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  const handleValueChange = (rowIndex, newValue) => {
    const updatedData = [...rowdata];
    if (updatedData[rowIndex]) {
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        glaccount: newValue,
      };
      setRowdata(updatedData);
      setIsDropdownOpen(false);
      setUnRealizedData(newValue);
      console.log(newValue, "NEW VALUE");
    }
  };

  console.log(TableData, "TABLE DATA");

  useEffect(() => {
    if (TableData && TableData.length > 0) {
      // Log the TableData for debugging
      console.log("TableData:", TableData);

      const formattedData = TableData.map((row) => ({
        code: row.code || "",
        currencyName: row.currencyName || "",
        decimalPlaces: row.decimalPlaces || "",
        realizedGainLossAccount:
          row.realizedGainLossAccount && row.realizedGainLossAccount.length > 0
            ? row.realizedGainLossAccount[0]
            : "",
        unrealizedGainLossAccount:
          row.unrealizedGainLossAccount &&
          row.unrealizedGainLossAccount.length > 0
            ? row.unrealizedGainLossAccount[0]
            : "",
        roundOff: row.roundOff || "",
        sign: row.sign || "",
        status: row.status || "",
      }));

      // Set the row data
      setRowdata(formattedData);

      // Initialize the decimalValues, realizedData, and unRealizedData
      const initialDecimalValues = {};
      const initialRealizedValues = {};
      const initialUnrealizedValues = {};

      formattedData.forEach((row, index) => {
        initialDecimalValues[index] = row.decimalPlaces || "";
        initialRealizedValues[index] = [row.realizedGainLossAccount] || "";
        initialUnrealizedValues[index] = [row.unrealizedGainLossAccount] || "";
      });
      const Realized = glAccountData.find(
        (Options) => Options[1] === "HBL1234"
      );

      console.log(Realized, "REALIZED");

      // Set initial values for each state
      setDecimalValues(initialDecimalValues);
      setRealizedData(initialRealizedValues);
      setUnRealizedData(initialUnrealizedValues);

      // Log the initial values for debugging
      console.log("Initial Realized Data:", initialRealizedValues);
      console.log("Decimal Data:", initialDecimalValues);
      console.log("Initial Unrealized Data:", initialUnrealizedValues);
      console.log("Formatted Data:", formattedData); // Debugging formatted data
    }
  }, [TableData]);
  const handleRealizedValueChange = (rowIndex, newValue) => {
    const updatedData = [...rowdata]; // Create a copy of the existing row data
    if (updatedData[rowIndex]) {
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        realizedAccount: newValue, // Update the realized account with the new value
      };
      setRowdata(updatedData); // Update the state with the modified data
      setIsDropdownOpen(false);
      setRealizedData(newValue);
      console.log(newValue, "REALIZED VALUE");
    }
  };
  const [decimalValues, setDecimalValues] = useState({});

  const handleCounterChange = (e, rowIndex) => {
    const value = e.target.value;

    // Update the decimal value for the specific row
    setDecimalValues((prev) => ({
      ...prev,
      [rowIndex]: value, // Update the specific row's decimal value
    }));
    setDecimalVal(value); // You can use this to keep track of the currently updated value

    console.log("Updated Row:", rowIndex, "Value:", value);
  };

  const [roundOffData, setRoundOffData] = useState(""); // State for round off dropdown
  const [roundOffDropdownValues, setRoundOffDropdownValues] = useState({}); // For storing dropdown values

  const handleRoundOffValueChange = (rowIndex, newValue) => {
    const updatedData = [...rowdata]; // Create a copy of the existing row data
    if (updatedData[rowIndex]) {
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        roundOffAccount: newValue, // Update the round off account with the new value
      };
      setRowdata(updatedData); // Update the state with the modified data
      setRoundOffData(newValue);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "currencyName",
      header: "Currency Name",
      mantineTableBodyCellProps: (cell) => ({
        style: {
          fontSize: "12px",
          color: "#464f60cc",
          textAlign: "center",
          width: "150px",
          borderRight: "1px solid #F2F2F2",
          borderTop: "1px solid #F2F2F2",
          borderBottom: "1px solid #F2F2F2",
        },
      }),
    },
    {
      accessorKey: "sign",
      header: "Sign",
      enableColumnActions: false,
      enableSorting: false,
    },
    {
      accessorKey: " decimalPlaces",
      header: "Decimal Places",
      enableColumnActions: false,
      enableSorting: false,
      Cell: ({ cell, row, table }) => {
        const rowIndex = row.index;
        const decimalValue = decimalValues[rowIndex] || "";

        return (
          <input
            type="number"
            min="0"
            onChange={(e) => handleCounterChange(e, rowIndex)}
            value={decimalValue}
            style={{
              width: "60px",
              padding: "4px",
              textAlign: "center",
              borderRadius: "4px",
              border: "1px solid #f5f5f5",
              outline: "none",
              color: "rgba(70, 79, 96, 0.8)",
              fontSize: "12px",
            }}
          />
        );
      },
    },
    {
      accessorKey: "numberOfPeriodsRoundOff",
      header: "Round Off",
      enableColumnActions: false,
      enableSorting: false,
      Cell: ({ cell }) => {
        const rowIndex = cell.row.index;
        const selectedValue = rowdata[rowIndex]?.roundOffAccount || ""; // Get the selected value for the round off column
        console.log(selectedValue, "ROUND OFF");
        return (
          <TypeDropdown
            value={["cwece"]}
            onChange={(newValue) =>
              handleRoundOffValueChange(rowIndex, newValue)
            }
            data={glAccountData} // You can use the same data as the other dropdowns or provide a separate dataset
            placeholder={"Select Round Off"}
          />
        );
      },
      mantineTableBodyCellProps: (cell) => ({
        style: {
          fontSize: "12px",
          color: "#464f60cc",
          textAlign: "center",
          width: "130px",
          borderRight: "1px solid #F2F2F2",
          borderTop: "1px solid #F2F2F2",
          borderBottom: "1px solid #F2F2F2",
        },
      }),
    },
    {
      accessorKey: "unrealizedGainLossAccount",
      header: "Unrealized Gain/Loss Account",
      enableColumnActions: false,
      enableSorting: false,
      Cell: ({ cell }) => {
        const rowIndex = cell.row.index;
        const selectedValue = rowdata[rowIndex]?.glaccount || "";
        console.log(selectedValue, "Selected Value");
        setUpdatedDropdown(cell.row.original.unrealizedGainLossAccount || "");
        // console.log(cell.row.original.unrealizedGainLossAccount, "CELL");
        return (
          <TypeDropdown
            value={selectedValue}
            onChange={(newValue) => handleValueChange(rowIndex, newValue)}
            data={glAccountData}
            placeholder={"Select Account"}
            onDropdownOpen={isDropdownOpen}
          />
        );
      },
      mantineTableBodyCellProps: (cell) => ({
        style: {
          fontSize: "12px",
          color: "#464f60cc",
          textAlign: "center",
          width: "130px",
          borderRight: "1px solid #F2F2F2",
          borderTop: "1px solid #F2F2F2",
          borderBottom: "1px solid #F2F2F2",
        },
      }),
    },
    {
      accessorKey: "realizedGainLossAccount",
      header: "Realized Gain/Loss Account",
      enableColumnActions: false,
      enableSorting: false,
      Cell: ({ cell }) => {
        const rowIndex = cell.row.index;
        const selectedValue = rowdata[rowIndex]?.realizedAccount || "";
        return (
          <TypeDropdown
            value={selectedValue}
            onChange={(newValue) =>
              handleRealizedValueChange(rowIndex, newValue)
            }
            data={glAccountData}
            placeholder={"Select Account"}
          />
        );
      },
      mantineTableBodyCellProps: (cell) => ({
        style: {
          fontSize: "12px",
          color: "#464f60cc",
          textAlign: "center",
          width: "130px",
          borderRight: "1px solid #F2F2F2",
          borderTop: "1px solid #F2F2F2",
          borderBottom: "1px solid #F2F2F2",
        },
      }),
    },
    {
      accessorKey: "status",
      header: "Add",
      Cell: ({ row }) => {
        const [checkboxValue, setCheckboxValue] = useState(row.original.status);

        useEffect(() => {
          setCheckboxValue(row.original.status);
        }, [row.original.status]);

        const handleStatusChange = (e) => {
          const updatedStatus = e.target.checked;
          setCheckboxValue(updatedStatus);
          // You can also call a function to handle further logic like an API call here if needed
          console.log(updatedStatus, "status updated");
          console.log(row.original.status, "original updated");
          setUpdatedStatus(updatedStatus);
        };

        return (
          <input
            style={{ width: "18px", height: "18px" }}
            type="checkbox"
            checked={checkboxValue}
            onChange={handleStatusChange}
          />
        );
      },
    },
  ]);
  console.log(checkoxValue, "CHECKBOX");
  console.log(dropdownValues, "Dropdown", unrealizedData, "Realized");
  console.log(updatedStatus, "Updated Status");

  const [selectedRow, setSelectedRow] = useState();

  // ////////////////////////////////////////////////////////Update Status/////////////////////////////////////////////////////////
  const UpdateToStatus =
    updatedStatus === undefined ? defaultStatus : updatedStatus;
  const UpdateStatus = async () => {
    const Response = await UpdateCurrencyStatus(
      selectedRow,
      UpdateToStatus,
      realizedData[1],
      unrealizedData[1],
      decimalVal,
      roundOffData[2]
    );
    if (selectedRow) {
      if (Response) {
        console.log(Response.data);
        setRowdata(Response.data);
        ReloadPage();
        SuccessToaster();
        cancel();
      } else {
        alert("Something went wrong!");
      }
    } else {
      alert("Click to select the row to update");
    }
  };

  const handleRowClick = (row) => {
    console.log("Row data:", row.original);
    setSelectedRow(row.original.id);
    setDefaultStatus(row.original.status);
  };

  const mantineTableBodyRowPropsTD = ({ row }) => {
    const toggleHandler = row.getToggleSelectedHandler();

    return {
      onClick: (event) => {
        handleRowClick(row);
        toggleHandler(event);
      },
      sx: (theme) => ({
        cursor: "pointer",
      }),
    };
  };

  const HandleScroll = () => {
    console.log("cwvewvwe");
  };

  return (
    <Wrap>
      <Wrapper>
        {/* <Title>DEFINE NEW CURRENCY</Title>
        <Line /> */}
        {/* <Grid> */}
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
          setTableHeight={true}
          GreyTitle={true}
          TableShadow={true}
          TableBorder={true}
          // state={{ rowSelection }}
          // renderExpandButton={() => null}
          mantineTableBodyRowProps={mantineTableBodyRowPropsTD}
          onScroll={HandleScroll}
          // getRowCanExpand={(row) => row.depth === 0}
          // mantineExpandButtonProps={({ row }) =>
          //   row.depth === 0 ? {} : { style: { display: "none" } }
          // }
        />
        {/* </Grid> */}
        <ActionButtons>
          <Btn1 onClick={cancel}>Cancel</Btn1>
          <Btn2 onClick={UpdateStatus}>Save</Btn2>
        </ActionButtons>
      </Wrapper>
    </Wrap>
  );
};

export default DefineCurrency;
