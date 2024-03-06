import { Alert, Button, IconButton, Paper, Snackbar, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import Fact from 'src/models/Fact';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import Slice from 'src/store/Slice';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

const FactsBasket = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const factsBasket = useAppSelector(s => s.slice.factsBasket);
  const user = useAppSelector(s => s.slice.loginUser);
  const columns: Array<GridColDef<Fact>> = [
    {
      field: 'text',
      headerName: "",
      flex: 1,
      type: 'string',
    },
    
    {
      field: 'action',
      sortable: false,
      disableColumnMenu: true,
      
      headerName: "",
      renderCell : (params) => (
          <Tooltip title="Remove From Basket">
            <IconButton
              color='error'
              onClick = {()=>{
                let newBasket = factsBasket.filter(f => f.id != params.row.id);
                dispatch(Slice.actions.setFactsBasket(newBasket));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      ),
      renderHeader: (params: GridColumnHeaderParams) => (
        <Button
          startIcon={<SaveIcon />}
          onClick={()=>{
            let newUser = {...user};

            let newFacts = user.facts.concat(factsBasket);

            newUser.facts = newFacts;

            dispatch(Slice.actions.setLoginUser(newUser));
            dispatch(Slice.actions.setFactsBasket([]));
            localStorage.setItem(newUser.username, JSON.stringify(newUser));
            setSavedSnackbar(true);
          }}
        >
          Save
        </Button>
      ),
    },
  ]

  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const deletedSnackbarOnClose = () => {
    setDeletedSnackbar(false);
  };

  const [savedSnackbar, setSavedSnackbar] = useState(false);

  const savedSnackbarOnClose = () => {
    setSavedSnackbar(false);
  };
  
  return (
    <Paper sx={{height:"100%"}}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={deletedSnackbar}
        autoHideDuration={3000}
        onClose={deletedSnackbarOnClose}
      >
        <Alert
          onClose={deletedSnackbarOnClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Fact Removed From The Basket.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={savedSnackbar}
        autoHideDuration={3000}
        onClose={savedSnackbarOnClose}
      >
        <Alert
          onClose={savedSnackbarOnClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Facts Saved.
        </Alert>
      </Snackbar>
      
      <DataGrid
        disableColumnFilter
        hideFooter
        getRowHeight={() => 'auto'}
        columns={columns}
        rows={factsBasket || []}
      />
      
      
    </Paper>
  );
}
export default FactsBasket;
