import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

//redux
import {
  switchToConfig,
  switchToDisplay,
  switchToCreate,
} from "../src/redux/features/Mode/modeSlice";

export default function BasicSelect({ title, inputValues }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(inputValues);
  const [selected, setSelected] = useState("display");
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    switch (selected) {
      case "display":
        dispatch(switchToDisplay());
        break;
      case "config":
        dispatch(switchToConfig());
        break;
      case "create":
        dispatch(switchToCreate());
        break;
    }
  }, [selected]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select value={selected} label={`${title}`} onChange={handleChange}>
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
