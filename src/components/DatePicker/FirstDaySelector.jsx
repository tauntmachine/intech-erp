import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDay } from "../../redux/appReducer/daySelectorSlice"; // Import the Redux action
import styled from "styled-components";
import Select from "react-select";
import { getDefaultLocalization, updateLocalization } from "../../Api/Apis"; // For API integration

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

// Options for day selection
const dayOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const FirstDaySelector = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.daySelector.day); // Redux state for selected day
  const [localSelectedDay, setLocalSelectedDay] = useState(null); // Local state for selected day
  const [localizationId, setLocalizationId] = useState(null); // To store localization ID for API updates

  // Handle day selection change
  const handleDayChange = async (selectedOption) => {
    const newDay = selectedOption.value;

    // Update Redux state for the day
    dispatch(setDay(newDay));
    setLocalSelectedDay(selectedOption); // Update local state

    // Call the updateLocalization API to update the firstDayOfWeek in the database
    if (localizationId) {
      try {
        const localizationData = { firstDayOfWeek: newDay }; // Only update firstDayOfWeek
        const response = await updateLocalization(localizationId, localizationData); // Update the backend
        
        if (response.status) {
          console.log("First day of the week updated successfully", response.data);
        } else {
          console.error("Failed to update the first day:", response.data);
        }
      } catch (error) {
        console.error("Error calling updateLocalization:", error.message);
      }
    }
  };

  // Fetch default localization data and set the first day of the week
  useEffect(() => {
    const fetchLocalizationData = async () => {
      const result = await getDefaultLocalization();
      if (result.status) {
        const dayFromApi = result.data.firstDayOfWeek; // Get firstDayOfWeek from the API
        const idFromApi = result.data.id; // Extract ID for updating later

        dispatch(setDay(dayFromApi)); // Set day in Redux
        setLocalSelectedDay(dayOptions.find(option => option.value === dayFromApi)); // Set day in local state
        setLocalizationId(idFromApi); // Store ID for future updates
      }
    };

    fetchLocalizationData();
  }, [dispatch]); // Run only once on component mount


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


  
  return (
    <DropDownContainer>
      <Title>First Day of the Week</Title>
      <Wrap>
        <Select
          options={dayOptions}
          styles={customStyles}
          onChange={handleDayChange} // Call API on day change
          placeholder="Select First Day"
          value={localSelectedDay || dayOptions.find(option => option.value === selectedDay)} // Use local or Redux state
        />
      </Wrap>
    </DropDownContainer>
  );
};

export default FirstDaySelector;
