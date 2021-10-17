import React, { useState, useEffect } from "react";
import Qty from "js-quantities";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

const ContainerDiv = styled.div`
  border: 2px solid black;
  padding: 10px 10px 0px 10px;
  margin-bottom: 10px;
  max-width: 360px;

  #twochild {
    display: block;
    justify-content: center;
    align-items: center;
  }

  #twochild .from-to {
    width: 173.6px;
  }

  @media (min-width: 400px) {
    min-width: 360px;

    #twochild {
      display: flex;
      margin-left: -15px;
    }
  }

  & > * {
    margin-bottom: 20px;
  }
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
      <div id="twochild">
        {/* FROM */}
        <div className="from-to">
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
        </div>
        {/* TO */}
        <div className="from-to">
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
        </div>
      </div>

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
