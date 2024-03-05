import { Grid } from "@mui/material";
import FactsBasket from "./FactsBasket";
import SavedFacts from "./SavedFacts";

const SaveFacts = ():JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={12} height="50vh">
        <FactsBasket />
      </Grid>
      <Grid item xs={12} height="50vh">
        <SavedFacts />
      </Grid>
    </Grid>
  );
}
export default SaveFacts;
