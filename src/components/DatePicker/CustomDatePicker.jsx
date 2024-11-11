import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateFormat } from "../../redux/appReducer/DateFormat"; // Adjust the action to set the dateFormat
import styled from "styled-components";
import Select from "react-select";
import { getDefaultLocalization, updateLocalization } from "../../Api/Apis"; // Ensure the update API is imported

const DropDownContainer = styled.div`
  width: 300px;
  position: relative;
  font-size: 12px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: absolute;
  top: -7px;
  left: 10px;
  z-index: ${(props) => (props.isDropdownOpen ? 0 : 5)};
  font-size: 12px;
  padding: 0px 4px;
  color: #58606f;
  font-weight: 700;
`;

const Wrap = styled.div``;

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const dateFormat = useSelector((state) => state.dateFormat.format); // Redux state for dateFormat
  const dateType = useSelector((state) => state.dateType.type); // Redux state for dateType
  const dateSeparator = useSelector((state) => state.dateSeparator.separator); // Redux state for dateSeparator

  const [selectedDateFormat, setSelectedDateFormat] = useState(null); // Local state for selected dateFormat
  const [localizationId, setLocalizationId] = useState(null); // State to store localization ID

  // Handle date format change from the dropdown
  const handleDateFormatChange = async (selectedOption) => {
    const newDateFormat = selectedOption.value;

    // Update Redux state for dateFormat
    dispatch(setDateFormat(newDateFormat));
    setSelectedDateFormat(selectedOption); // Update local state

    // Call the updateLocalization API to update the dateFormat in the database
    if (localizationId) {
      try {
        const localizationData = { dateFormat: newDateFormat }; // Only update dateFormat
        const response = await updateLocalization(localizationId, localizationData); // Update backend

        if (response.status) {
          console.log("Localization updated successfully", response.data);
        } else {
          console.error("Failed to update localization:", response.data);
        }
      } catch (error) {
        console.error("Error calling updateLocalization:", error.message);
      }
    }
  };

  const formatOptions = {
    Short: [
      {
        value: `MM${dateSeparator}DD${dateSeparator}YY`,
        label: (
          <>
            <span>MM DD YY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 08 25 24)
            </span>
          </>
        ),
      },
      {
        value: `DD${dateSeparator}MM${dateSeparator}YYYY`,
        label: (
          <>
            <span>DD MM YYYY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 08 2024)
            </span>
          </>
        ),
      },
      {
        value: `DD${dateSeparator}MM${dateSeparator}YY`,
        label: (
          <>
            <span>DD MM YY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 08 24)
            </span>
          </>
        ),
      },
      {
        value: `MM${dateSeparator}DD${dateSeparator}YYYY`,
        label: (
          <>
            <span>MM DD YYYY</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 08 25 2024)
            </span>
          </>
        ),
      },
      {
        value: `YYYY${dateSeparator}MM${dateSeparator}DD`,
        label: (
          <>
            <span>YYYY MM DD</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 2024 08 25)
            </span>
          </>
        ),
      },
      {
        value: `YY${dateSeparator}MM${dateSeparator}DD`,
        label: (
          <>
            <span>YY MM DD</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 24 08 25)
            </span>
          </>
        ),
      },
    ],
    Mid: [
      {
        value: `DD${dateSeparator}MMM${dateSeparator}YYYY`,
        label: (
          <>
            <span>DD MMM YYYY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 Aug 2024)
            </span>
          </>
        ),
      },
      {
        value: `DD${dateSeparator}MMM${dateSeparator}YY`,
        label: (
          <>
            <span>DD MMM YY</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 Aug 24)
            </span>
          </>
        ),
      },
      {
        value: `D${dateSeparator}MMM${dateSeparator}YY`,
        label: (
          <>
            <span>D MMM YY</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 Aug 24)
            </span>
          </>
        ),
      },
      {
        value: `MMM${dateSeparator}DD${dateSeparator}YYYY`,
        label: (
          <>
            <span>MMM DD YYYY</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. Aug 25 2024)
            </span>
          </>
        ),
      },
      {
        value: `MMM${dateSeparator}D${dateSeparator}YYYY`,
        label: (
          <>
            <span>MMM D YYYY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. Aug 25 2024)
            </span>
          </>
        ),
      },
      {
        value: `YYYY${dateSeparator}MMM${dateSeparator}DD`,
        label: (
          <>
            <span>YYYY MMM DD</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 2024 Aug 25)
            </span>
          </>
        ),
      },
      {
        value: `YY${dateSeparator}MMM${dateSeparator}DD`,
        label: (
          <>
            <span>YY MMM DD</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 24 Aug 25)
            </span>
          </>
        ),
      },
    ],
    Long: [
      {
        value: `DD${dateSeparator}MMMM${dateSeparator}YYYY`,
        label: (
          <>
            <span>DD MMMM YYYY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 August 2024)
            </span>
          </>
        ),
      },
      {
        value: `D${dateSeparator}MMMM${dateSeparator}YY`,
        label: (
          <>
            <span>D MMMM YY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 25 August 24)
            </span>
          </>
        ),
      },
      {
        value: `MMMM${dateSeparator}DD${dateSeparator}YYYY`,
        label: (
          <>
            <span>MMMM DD YYYY</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. August 25 2024)
            </span>
          </>
        ),
      },
      {
        value: `MMMM${dateSeparator}DD${dateSeparator}YYYY`,
        label: (
          <>
            <span>MMMM D YYYY</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. August 25 2024)
            </span>
          </>
        ),
      },
      {
        value: `YYYY${dateSeparator}MMMM${dateSeparator}DD`,
        label: (
          <>
            <span>YYYY MMMM DD</span> <br />
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 2024 August 25)
            </span>
          </>
        ),
      },
      {
        value: `YYYY${dateSeparator}MMMM${dateSeparator}D`,
        label: (
          <>
            <span>YYYY MMMM D</span>
            <br />{" "}
            <span style={{ opacity: 0.6, fontSize: "10px" }}>
              (e.g. 2024 August 25)
            </span>
          </>
        ),
      },
    ],
  };

  const options = formatOptions[dateType] || [];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      border: state.isFocused ? "1px solid #157BEA" : "1px solid #464f604d",
      boxShadow: state.isFocused ? "0 0 0 1px none" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #157BEA" : "1px solid #464f604d",
      },
      minHeight: "44px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "13px",
      color: "#58606f",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#abafb7",
      fontSize: "13px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#58606f",
      fontSize: "12px",
    }),
  };

  // Fetch default localization data and set the date format
  useEffect(() => {
    const fetchLocalizationData = async () => {
      const result = await getDefaultLocalization();
      if (result.status) {
        const dateFormatFromApi = result.data.dateFormat; // Extract the dateFormat from the API response
        const idFromApi = result.data.id; // Extract the ID from the API response

        dispatch(setDateFormat(dateFormatFromApi)); // Dispatch to set dateFormat in Redux
        setSelectedDateFormat(options.find(option => option.value === dateFormatFromApi)); // Update local state for dropdown
        setLocalizationId(idFromApi); // Store the ID for future updates
      }
    };

    fetchLocalizationData();
  }, [dispatch, options]);

  return (
    <DropDownContainer>
      <Title>Date Format</Title>
      <Wrap>
        <Select
          options={options}
          styles={customStyles}
          onChange={handleDateFormatChange} // Call API on change
          placeholder="Select Date Format"
          value={selectedDateFormat || options.find(option => option.value === dateFormat)} // Use either local or Redux state
        />
      </Wrap>
    </DropDownContainer>
  );
};

export default CustomDatePicker;
