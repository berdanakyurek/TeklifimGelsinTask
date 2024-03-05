import { Box, Paper, Tab, Tabs } from "@mui/material";
import TabPanel from "../components/TabPanel";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = ():JSX.Element => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp /> 
      </TabPanel>
      
    </Paper>
  );
}
export default Auth;
