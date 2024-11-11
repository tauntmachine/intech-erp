import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateSeparator } from "../../redux/appReducer/DateSeparator";
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

const DateSeparatorSelector = () => {
  const dispatch = useDispatch();
  const dateSeparator = useSelector((state) => state.dateSeparator.separator); // Redux state for dateSeparator
  const [selectedDateSeparator, setSelectedDateSeparator] = useState(null); // Local state for selected dateSeparator
  const [localizationId, setLocalizationId] = useState(null); // State to store localization ID

  // Handle date separator change from the dropdown
  const handleDateSeparatorChange = async (selectedOption) => {
    const newDateSeparator = selectedOption.value;

    // Update Redux state for dateSeparator
    dispatch(setDateSeparator(newDateSeparator));
    setSelectedDateSeparator(selectedOption); // Update local state

    // Call the updateLocalization API to update the dateSeparator in the database
    if (localizationId) {
      try {
        const localizationData = { dateSeparator: newDateSeparator }; // Only update dateSeparator
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

  const options = [
    { value: " ", label: "Space ( )" },
    { value: ".", label: "Period (.)" },
    { value: "-", label: "Hyphen (-)" },
    { value: "/", label: "Slash (/)" },
  ];

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

  // Fetch default localization data and set the date separator
  useEffect(() => {
    const fetchLocalizationData = async () => {
      const result = await getDefaultLocalization();
      if (result.status) {
        const dateSeparatorFromApi = result.data.dateSeparator; // Extract the dateSeparator from the API response
        const idFromApi = result.data.id; // Extract the ID from the API response

        dispatch(setDateSeparator(dateSeparatorFromApi)); // Dispatch to set dateSeparator in Redux
        setSelectedDateSeparator(options.find(option => option.value === dateSeparatorFromApi)); // Update local state for dropdown
        setLocalizationId(idFromApi); // Store the ID for future updates
      }
    };

    fetchLocalizationData();
  }, [dispatch]); // Runs only once on component mount

  return (
    <DropDownContainer>
      <Title>Date Separator</Title>
      <Wrap>
        <Select
          options={options}
          styles={customStyles}
          onChange={handleDateSeparatorChange} // Call API on change
          placeholder="Select Date Separator"
          value={selectedDateSeparator || options.find(option => option.value === dateSeparator)} // Use either local or Redux state
        />
      </Wrap>
    </DropDownContainer>
  );
};

export default DateSeparatorSelector;
