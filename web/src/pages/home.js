import { useState } from 'react';
import Layout from '../components/layout';
import SearchDatePicker from '../components/search-date-picker';
import LocationList from '../components/location-list';
import fetchApi from '../utils/fetch-api';
import formatDateTime from '../utils/format-date-time';

const Home = () => {
  const [searchDateTime, setSearchDateTime] = useState('');
  const [searchDateTimeString, setSearchDateTimeString] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleDateTimeChange = async (dateTime) => {
    setSearchDateTime(dateTime);

    const dateTimeString = formatDateTime(dateTime);
    setSearchDateTimeString(dateTimeString);

    if (dateTimeString) {
      const queryString = `?searchDateTime=${dateTimeString}`;
      const locationData = await fetchApi({ url: `v1/search/location${queryString}` });
      setLocations(locationData);
    }
  };

  return (
    <Layout>
      <SearchDatePicker searchDateTime={searchDateTime} handleOnChange={handleDateTimeChange} />
      <LocationList searchDateTimeString={searchDateTimeString} locations={locations} />
    </Layout>
  );
}

export default Home;
