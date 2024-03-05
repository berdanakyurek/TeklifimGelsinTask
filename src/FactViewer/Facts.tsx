import { Grid } from "@mui/material";
import FactsTab from "./FactsTab";
import SaveFacts from "./SaveFacts";

const Facts = ():JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <FactsTab />
      </Grid>
      <Grid item xs={12} md={6}>
        <SaveFacts />
      </Grid>
    </Grid>
  );
}
export default Facts;
