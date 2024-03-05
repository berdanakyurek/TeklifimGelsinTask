import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Fact from "./Fact";

export type FactTypes = "random" | "today";

const FactsTab = ():JSX.Element => {

  
  const [factType, setFactType] = useState<FactTypes>("random");
  const handleChange = (event: React.SyntheticEvent, newValue: FactTypes) => {
    setFactType(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={factType} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Random Fact" value="random"/>
          <Tab label="Today's Fact" value="today"/>
        </Tabs>
      </Box>
      <Fact factType={factType} />
      
    </>
  );
}
export default FactsTab;
