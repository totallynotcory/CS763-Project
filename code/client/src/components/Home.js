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
import { box, title, bigTitle } from "./style/styles.js";

function Home() {
  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Home Page
      </Typography>
      <Typography variant="h6" gutterBottom sx={title}>
        Welcome to the home page!
      </Typography>
    </Box>
  );
}

export default Home;
