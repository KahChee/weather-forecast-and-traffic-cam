import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/index.css';

const SearchDatePicker = ({ searchDateTime, handleOnChange }) => {
  return (
    <div className="search-date-picker-container">
      <DatePicker
        placeholderText="Click to select a datetime"
        showIcon
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={5}
        dateFormat="yyyy-MM-dd, hh:mm aa"
        selected={searchDateTime}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default SearchDatePicker;
