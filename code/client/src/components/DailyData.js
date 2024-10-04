import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid2,
  FormControl,
  InputAdornment,
  Collapse,
  Paper,
} from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  box,
  title,
  textField,
  inputLable,
  inputBackground,
  menuPropsStyles,
  submitButton,
  sideMenuBox,
  sideMenuTitle,
  datePick,
  calendarStyle,
} from "./style/styles.js";

function DailyData() {
  const [weight, setWeight] = useState("");
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [mood, setMood] = useState(3);
  const [exercise, setExercise] = useState("No");
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseTime, setExerciseTime] = useState({
    type: "",
    exerciseTimeValue: 0,
  });
  const [water, setWater] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  // date
  const [date, setDate] = useState(null); //
  const [anchorEl, setAnchorEl] = useState(null); // control Popper content
  const [open, setOpen] = useState(false); // control Popper open/close
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false); // close after chosing date
  };
  const handleTextFieldClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen); // open/close calendar
  };
  const formatDate = (date) => {
    return date ? date.toLocaleDateString("en-CA") : "";
  };

  const handleMoodChange = (event, newValue) => {
    setMood(newValue);
  };
  const calendarRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpen(false); // Close the calendar if clicked outside
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={title}>
        Enter your data here:
      </Typography>

      {/* <Typography variant="body1" gutterBottom sx={{ marginBottom: "2%" }}>
        {date}
      </Typography> */}
      <TextField
        label="Select a date"
        value={formatDate(date)}
        onClick={handleTextFieldClick}
        readOnly
        variant="filled"
        sx={datePick}
        fullWidth
      />

      <Collapse in={open}>
        <Paper ref={calendarRef} sx={calendarStyle}>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            styles={{
              month: {
                backgroundColor: "#C2D5C0",
                padding: "1rem",
                borderRadius: "20px",
              },
            }}
          />
        </Paper>
      </Collapse>

      {/* Weight */}
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <TextField
            label="Weight"
            variant="filled"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    lb
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={textField}
          />
        </Grid2>
        {/* Steps Count */}
        <Grid2 item xs={12} md={6}>
          <TextField
            label="Count"
            variant="filled"
            fullWidth
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    Steps
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={textField}
          />
        </Grid2>
        {/* Sleep hour */}
        <Grid2 item xs={12} md={6}>
          <TextField
            label="Sleep"
            variant="filled"
            fullWidth
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    hour
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={textField}
          />
        </Grid2>

        {/* water */}
        <Grid2 item xs={12} md={6}>
          <TextField
            label="Water"
            variant="filled"
            fullWidth
            value={water}
            onChange={(e) => setWater(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    glass
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={textField}
          />
        </Grid2>

        {/* How long did you exercise */}
        <Grid2 item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              data-testid="exerciseTime"
              type="number"
              name="exerciseTime"
              label="How long did you exercise - min"
              value={exerciseTime.exerciseTimeValue}
              onChange={(e) =>
                setExerciseTime({
                  ...exerciseTime,
                  exerciseTimeValue: e.target.value,
                })
              }
              required
              InputLabelProps={{
                sx: inputLable,
              }}
              InputProps={{
                sx: inputBackground,
              }}
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </Grid2>
        {/* <InputLabel sx={inputLable}>How long did you exercise</InputLabel> */}
        {/* <Select
              value={exerciseTime}
              onChange={(e) => setExerciseTime(e.target.value)}
              label="How long did you exercise"
              sx={inputBackground}
              MenuProps={menuPropsStyles}
            >
              <MenuItem value="30 mins">30 mins</MenuItem>
              <MenuItem value="1 hour">1 hour</MenuItem>
              <MenuItem value="2 hours">2 hours</MenuItem>
            </Select> */}

        {/* Mood */}
        {/* <Grid item xs={12}>
          <Typography variant="body1">Mood</Typography>
          <Slider
            value={mood}
            onChange={handleMoodChange}
            step={1}
            min={1}
            max={5}
            marks={[
              { value: 1, label: "😞" },
              { value: 3, label: "😐" },
              { value: 5, label: "😊" },
            ]}
            aria-labelledby="mood-slider"
            sx={{ color: "#F8DEBD" }}
          />
        </Grid> */}

        {/* Exercise */}
        {/* <Grid item xs={12}>
          <Typography variant="body1">Exercise</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            >
              <FormControlLabel
                value="Yes"
                control={
                  <Radio
                    sx={{
                      color: "#CACACA", // Button color before focused
                      "&.Mui-checked": {
                        color: "#F8DEBD", // Button color when focused
                      },
                    }}
                  />
                }
                label="Yes"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#CACACA", // font color before focused
                  },
                }}
              />
              <FormControlLabel
                value="No"
                control={
                  <Radio
                    sx={{
                      color: "#CACACA", // Button color before focused
                      "&.Mui-checked": {
                        color: "#F8DEBD", // Button color when focused
                      },
                    }}
                  />
                }
                label="No"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#CACACA", // font color before focused
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </Grid> */}

        {/*Choose the exercise */}
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={inputLable}
            >
              Choose the exercise
            </InputLabel>
            <Select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              label="How long did you exercise"
              sx={inputBackground}
              MenuProps={menuPropsStyles}
            >
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Walking">Walking</MenuItem>
              <MenuItem value="Yoga">Yoga</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* What did you take for breakfast */}
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 2%",
                color: "#CACACA", // font color when unfocused
                borderRadius: "10px",
                "&.Mui-focused": {
                  // font color when focused
                  color: "#F8DEBD",
                  borderRadius: "10px",
                },
              }}
            >
              What did you take for breakfast
            </InputLabel>
            <Select
              value={breakfast}
              onChange={(e) => setBreakfast(e.target.value)}
              label="What did you take for breakfast"
              sx={{
                backgroundColor: "#5E5E5E",
                borderRadius: "10px",
                "& .MuiInputBase-input": {
                  color: "#F4F4F4", // text in box(answer) - text color
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#6F6F6F", // dropdown background color
                    color: "#F4F4F4", // dropdown text color
                  },
                },
              }}
            >
              <MenuItem value="Oatmeal">Oatmeal</MenuItem>
              <MenuItem value="Eggs">Eggs</MenuItem>
              <MenuItem value="Fruit">Fruit</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        {/* What did you take for lunch */}
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 2%",
                color: "#CACACA", // font color when unfocused
                borderRadius: "10px",
                "&.Mui-focused": {
                  // font color when focused
                  color: "#F8DEBD",
                  borderRadius: "10px",
                },
              }}
            >
              What did you take for lunch
            </InputLabel>
            <Select
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
              label="What did you take for lunch"
              sx={{
                backgroundColor: "#5E5E5E",
                borderRadius: "10px",
                "& .MuiInputBase-input": {
                  color: "#F4F4F4", // text in box(answer) - text color
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#6F6F6F", // dropdown background color
                    color: "#F4F4F4", // dropdown text color
                  },
                },
              }}
            >
              <MenuItem value="Salad">Salad</MenuItem>
              <MenuItem value="Sandwich">Sandwich</MenuItem>
              <MenuItem value="Rice & Chicken">Rice & Chicken</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        {/* What did you take for dinner */}
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 2%",
                color: "#CACACA", // font color when unfocused
                borderRadius: "10px",
                "&.Mui-focused": {
                  // font color when focused
                  color: "#F8DEBD",
                  borderRadius: "10px",
                },
              }}
            >
              What did you take for dinner
            </InputLabel>
            <Select
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
              label="What did you take for dinner"
              sx={{
                backgroundColor: "#5E5E5E",
                borderRadius: "10px",
                "& .MuiInputBase-input": {
                  color: "#F4F4F4", // text in box(answer) - text color
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#6F6F6F", // dropdown background color
                    color: "#F4F4F4", // dropdown text color
                  },
                },
              }}
            >
              <MenuItem value="Soup">Soup</MenuItem>
              <MenuItem value="Steak">Steak</MenuItem>
              <MenuItem value="Pasta">Pasta</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
      </Grid2>
    </Box>
  );
}

export default DailyData;
