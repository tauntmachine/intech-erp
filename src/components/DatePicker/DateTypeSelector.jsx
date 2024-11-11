import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateType } from "../../redux/appReducer/DateType";
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

// Options for date types
const options = [
  { value: "Short", label: "Short Date" },
  { value: "Mid", label: "Mid Date" },
  { value: "Long", label: "Long Date" },
];

const DateTypeSelector = () => {
  const dispatch = useDispatch();
  const dateType = useSelector((state) => state.dateType.type); // Redux state for date type
  const [selectedDateType, setSelectedDateType] = useState(null); // Local state for selected date type
  const [localizationId, setLocalizationId] = useState(null); // State to store the localization ID from API

  // Handle date type change from the dropdown
  const handleDateTypeChange = async (selectedOption) => {
    const newDateType = selectedOption.value;

    // Update Redux state for dateType
    dispatch(setDateType(newDateType));
    setSelectedDateType(selectedOption); // Update local state

    // Call the updateLocalization API to update the dateType in the database
    if (localizationId) {
      try {
        const localizationData = { dateType: newDateType }; // Only update dateType
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

  // Fetch default localization data and set the date type
  useEffect(() => {
    const fetchLocalizationData = async () => {
      const result = await getDefaultLocalization();
      if (result.status) {
        const dateTypeFromApi = result.data.dateType; // Extract the dateType from the API response
        const idFromApi = result.data.id; // Extract the ID from the API response

        dispatch(setDateType(dateTypeFromApi)); // Dispatch to set dateType in Redux
        setSelectedDateType(options.find(option => option.value === dateTypeFromApi)); // Update local state for dropdown
        setLocalizationId(idFromApi); // Store the ID for future updates
      }
    };

    fetchLocalizationData();
  }, [dispatch]); // Runs only once on component mount

  return (
    <DropDownContainer>
      <Title>Date Type</Title>
      <Wrap>
        <Select
          options={options}
          styles={customStyles}
          onChange={handleDateTypeChange} // Call API on change
          placeholder="Select Date Type"
          value={selectedDateType || options.find(option => option.value === dateType)} // Use either local or Redux state
        />
      </Wrap>
    </DropDownContainer>
  );
};

export default DateTypeSelector;
