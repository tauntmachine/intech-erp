import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Select from "react-select";
import { setTimeFormat } from "../../redux/appReducer/timeFormatSlice"; // Redux action to set time format
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

// Options for time formats
const timeFormatOptions = [
  { label: "12-hour", value: "12-hour" },
  { label: "24-hour", value: "24-hour" },
];

const TimeFormatSelector = () => {
  const dispatch = useDispatch();
  const timeFormat = useSelector((state) => state.timeFormat.format); // Redux state for time format
  const [selectedTimeFormat, setSelectedTimeFormat] = useState(null); // Local state for selected time format
  const [localizationId, setLocalizationId] = useState(null); // State to store the localization ID from API

  // Handle time format change from the dropdown
  const handleTimeFormatChange = async (selectedOption) => {
    const newTimeFormat = selectedOption.value;

    // Update Redux state for timeFormat
    dispatch(setTimeFormat(newTimeFormat));
    setSelectedTimeFormat(selectedOption); // Update local state

    // Call the updateLocalization API to update the timeFormat in the database
    if (localizationId) {
      try {
        const localizationData = { timeFormat: newTimeFormat }; // Only update timeFormat
        const response = await updateLocalization(localizationId, localizationData); // Update the backend

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

  // Custom styles for the dropdown
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
    placeholder: (provided) => ({
      ...provided,
      color: "#abafb7",
      fontSize: "13px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#58606f",
      fontSize: "12px",
    }),
  };

  // Fetch default localization data and set the time format
  useEffect(() => {
    const fetchLocalizationData = async () => {
      const result = await getDefaultLocalization();
      if (result.status) {
        const timeFormatFromApi = result.data.timeFormat; // Extract the timeFormat from the API response
        const idFromApi = result.data.id; // Extract the ID from the API response

        dispatch(setTimeFormat(timeFormatFromApi)); // Dispatch to set timeFormat in Redux
        setSelectedTimeFormat(timeFormatOptions.find(option => option.value === timeFormatFromApi)); // Update local state for dropdown
        setLocalizationId(idFromApi); // Store the ID for future updates
      }
    };

    fetchLocalizationData();
  }, [dispatch]); // Runs only once on component mount

  return (
    <DropDownContainer>
      <Title>Time Format</Title>
      <Wrap>
        <Select
          options={timeFormatOptions}
          styles={customStyles}
          onChange={handleTimeFormatChange} // Call API on change
          placeholder="Select Time Format"
          value={selectedTimeFormat || timeFormatOptions.find(option => option.value === timeFormat)} // Use either local or Redux state
        />
      </Wrap>
    </DropDownContainer>
  );
};

export default TimeFormatSelector;
