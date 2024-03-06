import { Alert, BottomNavigation, Button, Grid, Link, Paper, Snackbar, Typography } from "@mui/material";
import { useGetFactQuery } from "src/services/FactApi";
import { FactTypes } from "./FactsTab";
import RefreshIcon from '@mui/icons-material/Refresh';
import LanguagePicker from "./LanguagePicker";
import { useState } from "react";
import { LanguageType } from "src/models/Fact";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useAppDispatch, useAppSelector } from "src/store/store";
import Slice from "src/store/Slice";

interface IFactProps {
  factType : FactTypes
} 

const Fact = (props: IFactProps):JSX.Element => {
  const [language, setLanguage] = useState<LanguageType>(null);

  const factsBasket = useAppSelector(s => s.slice.factsBasket);
  const user = useAppSelector(s => s.slice.loginUser);
  const dispatch = useAppDispatch();
  
  const query = useGetFactQuery({
    factType: props.factType,
    language: language
  });

  const addToBasket = ()=>{
    if(factsBasket.includes(query.data) || user.facts.includes(query.data)){
      setErrorSnackbar(true);
      return;
    }
    let newBasket = [...factsBasket];
    newBasket.push(query.data);
    dispatch(Slice.actions.setFactsBasket(newBasket));
  }

  const [ errorSnackbar, setErrorSnackbar ] = useState(false);
  const [ successSnackbar, setSuccessSnackbar ] = useState(false);

  const errorSnackbarOnClose = () => {
    setErrorSnackbar(false);
  }

  const successSnackbarOnClose = () => {
    setSuccessSnackbar(false);
  }
  
  return (
    <Grid container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={errorSnackbarOnClose}
      >
        <Alert
          onClose={errorSnackbarOnClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This Fact Already Added To Basket.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={successSnackbarOnClose}
      >
        <Alert
          onClose={successSnackbarOnClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Fact Succesfully Added To Basket.
        </Alert>
      </Snackbar>
      
      <Grid item xs={6}>
        <LanguagePicker
          value={language}
          setValue={(v: LanguageType)=>{setLanguage(v)}}
        />
      </Grid>

      <Grid item xs={3}>
        <Button
          startIcon={<RefreshIcon />}
          onClick={()=>{query.refetch()}}
        >
          Refresh
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          startIcon={<ShoppingBasketIcon />}
          onClick={addToBasket}
        >
          Add To Basket
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography>{query?.data?.text}</Typography>      
      </Grid>

      <Link
        href="https://github.com/berdanakyurek/TeklifimGelsinTask"
        target="_blank"
      >
        Source Code
      </Link>
    </Grid>
    
  );
}
export default Fact;
