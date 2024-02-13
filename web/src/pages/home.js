import { useState } from 'react';
import Layout from '../components/layout';
import SearchDatePicker from '../components/search-date-picker';

const Home = () => {
  const [searchDateTime, setSearchDateTime] = useState('');

  const handleDateTimeChange = (dateTime) => {
    setSearchDateTime(dateTime);
  };

  return (
    <Layout>
      <SearchDatePicker searchDateTime={searchDateTime} handleOnChange={handleDateTimeChange} />
    </Layout>
  );
}

export default Home;
