import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Slider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

function DailyData() {
  const [date, setDate] = useState("Aug 8, 2024");
  const [weight, setWeight] = useState("");
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [mood, setMood] = useState(3);
  const [exercise, setExercise] = useState("No");
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  const [water, setWater] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const handleMoodChange = (event, newValue) => {
    setMood(newValue);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#303030",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Enter your data here:
      </Typography>

      <Typography variant="body1" gutterBottom>
        {date}
      </Typography>

      {/* Weight */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
            sx={{
              backgroundColor: "#5E5E5E",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                color: "#F4F4F4", // input color
              },
              "& .MuiInputLabel-root": {
                color: "#CACACA", // label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F8DEBD", // focused label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none", // no underline when unfocuced
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#F8DEBD", // underline color when focuced
              },
              "& .MuiInputAdornment-root": {
                color: "#F4F4F4", // lb color
              },
            }}
          />
        </Grid>
        {/* Steps Count */}
        <Grid item xs={6}>
          <TextField
            label="Step count"
            variant="filled"
            fullWidth
            value={steps}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    Steps
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#5E5E5E",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                color: "#F4F4F4", // input color
              },
              "& .MuiInputLabel-root": {
                color: "#CACACA", // label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F8DEBD", // focused label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none", // no underline when unfocuced
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#F8DEBD", // underline color when focuced
              },
              "& .MuiInputAdornment-root": {
                color: "#F4F4F4", // Steps color
              },
            }}
          />
        </Grid>
        {/* Sleep hour */}
        <Grid item xs={6}>
          <TextField
            label="Sleep"
            variant="filled"
            fullWidth
            value={sleep}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    hour
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#5E5E5E",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                color: "#F4F4F4", // input color
              },
              "& .MuiInputLabel-root": {
                color: "#CACACA", // label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F8DEBD", // focused label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none", // no underline when unfocuced
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#F8DEBD", // underline color when focuced
              },
              "& .MuiInputAdornment-root": {
                color: "#F4F4F4", // hour color
              },
            }}
          />
        </Grid>

        {/* water */}
        <Grid item xs={6}>
          <TextField
            label="Water"
            variant="filled"
            fullWidth
            value={water}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: "#F4F4F4" }}>
                    glass
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#5E5E5E",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                color: "#F4F4F4", // input color
              },
              "& .MuiInputLabel-root": {
                color: "#CACACA", // label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F8DEBD", // focused label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none", // no underline when unfocuced
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#F8DEBD", // underline color when focuced
              },
              "& .MuiInputAdornment-root": {
                color: "#F4F4F4", // hour color
              },
            }}
          />
        </Grid>

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
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 8px",
                color: "#CACACA", // font color when unfocused
                borderRadius: "10px",
                "&.Mui-focused": {
                  // font color when focused
                  color: "#F8DEBD",
                  borderRadius: "10px",
                },
              }}
            >
              Choose the exercise
            </InputLabel>
            <Select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              label="How long did you exercise"
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
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Walking">Walking</MenuItem>
              <MenuItem value="Yoga">Yoga</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* How long did you exercise */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 8px",
                color: "#CACACA", // font color when unfocused
                borderRadius: "10px",
                "&.Mui-focused": {
                  // font color when focused
                  color: "#F8DEBD",
                  borderRadius: "10px",
                },
              }}
            >
              How long did you exercise
            </InputLabel>
            <Select
              value={exerciseTime}
              onChange={(e) => setExerciseTime(e.target.value)}
              label="How long did you exercise"
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
              <MenuItem value="30 mins">30 mins</MenuItem>
              <MenuItem value="1 hour">1 hour</MenuItem>
              <MenuItem value="2 hours">2 hours</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* What did you take for breakfast */}
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "#5E5E5E", // question font background color
                padding: "0 8px",
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
                padding: "0 8px",
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
                padding: "0 8px",
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
      </Grid>
    </Box>
  );
}

export default DailyData;
