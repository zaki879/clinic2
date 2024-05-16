import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { useState } from "react";

export const MuiPicker = () => {
  const [selectedDate, setSelectedDate] = (useState < Date) | (null > null);
  return (
    <Stack spacing={4} sx={{ width: "250px" }}>
      <DatePicker
        label="Date picker"
        renderInput={(params) => <TextField {...params}></TextField>}
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue);
        }}
      ></DatePicker>
    </Stack>
  );
};
