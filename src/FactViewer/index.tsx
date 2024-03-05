import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import Facts from "./Facts";

const FactViewer = ():JSX.Element => {
  const loginUser = useAppSelector(s => s.slice.loginUser);
  
  return loginUser ? (
    <Facts />
  ) : <Navigate to='/auth' />;
}
export default FactViewer;
