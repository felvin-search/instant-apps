import React, { useState, useEffect } from "react";
import Qty from "js-quantities";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

const ContainerDiv = styled.div`
  border: 0.125rem solid black;
  padding: 0.625rem 0.625rem 0rem 0.625rem;
  margin-bottom: 0.625rem;
  max-width: 22.5rem;
  @media (min-width: 25rem) {
    min-width: 22.5rem;
  }
  & > * {
    margin-bottom: 1.25rem;
  }
`;

const TwochildDiv = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  @media (min-width: 25rem) {
    display: flex;
    margin-left: -0.938rem;
  }
`;

const FromtoDiv = styled.div`
  width: 10.85rem;
`;

const UnitConverter = (props) => {
  const unitTypes = Qty.getKinds().slice(1, 46);

  const units = ["Select One", ...unitTypes];
  const [currUnit, setCurrUnit] = useState("Select One");
  const [isSelected, setIsSelected] = useState(false);
  const [fromUnits, setFromUnits] = useState();
  const [toUnits, setToUnits] = useState();

  const [convert, setConvert] = useState({
    fromUnit: "",
    toUnit: "",
    number: "",
  });

  const [result, setResult] = useState({
    result: "",
  });

  const handleChangeUnitType = (e) => {
    const unit = e.target.value;

    setCurrUnit(unit);

    setIsSelected(true);

    setFromUnits(
      Qty.getUnits(unit).map((id) => (
        <option key={id} id={id}>
          {id}
          {setConvert((prev) => {
            return { ...prev, fromUnit: id };
          })}
        </option>
      ))
    );

    setToUnits(
      Qty.getUnits(unit).map((id) => (
        <option key={id} id={id}>
          {id}
          {setConvert((prev) => {
            return { ...prev, number: 0, toUnit: id };
          })}
        </option>
      ))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    e.preventDefault();

    if (isSelected === true) {
      setConvert({
        ...convert,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (convert.number === "") {
      return;
    }

    const formula = Qty(parseFloat(convert.number) + convert.fromUnit).to(
      convert.toUnit
    );
    const { scalar } = formula;

    setResult({ result: scalar });
  }, [convert]);

  return (
    <ContainerDiv>
      {/* Unit Type */}

      <div>
        <InputLabel htmlFor="select-native-simple">Unit Type</InputLabel>
        <Select
          native
          name="units"
          onChange={handleChangeUnitType}
          value={currUnit}
        >
          {units.map((id) => {
            return (
              <option key={id} id={id} value={id}>
                {id}
              </option>
            );
          })}
        </Select>
      </div>

      {/* <div>
        <p />
      </div> */}
      <TwochildDiv>
        {/* FROM */}
        <FromtoDiv>
          <InputLabel htmlFor="select-native-simple">From</InputLabel>
          <Select
            native
            name="fromUnit"
            onChange={handleChange}
            value={props.fromUnit}
          >
            <option>
              {isSelected ? "Select Measurement" : "Select Unit First"}
            </option>
            {fromUnits}
          </Select>
        </FromtoDiv>
        {/* TO */}
        <FromtoDiv>
          <InputLabel htmlFor="select-native-simple">To</InputLabel>
          <Select
            native
            name="toUnit"
            onChange={handleChange}
            value={props.toUnit}
          >
            <option>
              {isSelected ? "Select Measurement" : "Select Unit First"}
            </option>
            {toUnits}
          </Select>
        </FromtoDiv>
      </TwochildDiv>

      {/* AMOUNT */}
      <div>
        <TextField
          name="number"
          onChange={handleChange}
          placeholder="Enter Some Value"
        />
      </div>
      <div>Value = {convert.number > 0 ? result.result : ""}</div>
    </ContainerDiv>
  );
};

export default UnitConverter;
