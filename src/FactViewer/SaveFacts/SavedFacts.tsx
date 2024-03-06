import { Alert, IconButton, Paper, Snackbar, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Fact from "src/models/Fact";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "src/store/store";
import Slice from "src/store/Slice";
import { useState } from "react";

const SavedFacts = ():JSX.Element => {
  const user = useAppSelector(s => s.slice.loginUser);
  const dispatch = useAppDispatch();
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
              let newUser = {...user};

              let newFacts = user.facts.filter(f => f.id != params.row.id);

              newUser.facts = newFacts;

              dispatch(Slice.actions.setLoginUser(newUser));
              localStorage.setItem(newUser.username, JSON.stringify(newUser));
              setDeletedSnackbar(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ]

  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const deletedSnackbarOnClose = () => {
    setDeletedSnackbar(false);
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
      
      <DataGrid
        disableColumnFilter
        hideFooter
        getRowHeight={() => 'auto'}
        columns={columns}
        rows={user.facts || []}
      />
      
      
    </Paper>
  );
}
export default SavedFacts;
