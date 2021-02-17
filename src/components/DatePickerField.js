import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      name={name}
      className="form-control"
      dateFormat="dd/MM/yyyy"
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};
