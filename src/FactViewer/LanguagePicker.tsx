import { MenuItem, Select } from "@mui/material";
import { LanguageType } from "src/models/Fact";

interface ILanguagePickerProps {
  value: LanguageType;
  setValue: (v: LanguageType) => void;
}

const LanguagePicker = (props: ILanguagePickerProps):JSX.Element => {
  return (
    <Select
      fullWidth
      value={props.value}
      label="Language"
      onChange={(e)=>{props.setValue(e.target.value as LanguageType)}}
    >
      <MenuItem value={null}>Any</MenuItem>
      <MenuItem value={"en"}>English</MenuItem>
      <MenuItem value={"de"}>German</MenuItem>
    </Select>
  );
}
export default LanguagePicker;
