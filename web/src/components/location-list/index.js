import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import fetchApi from '../../utils/fetch-api';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles/index.css';

const LocationList = ({ searchDateTimeString, locations = [] }) => {
  const [locationInfo, setLocationInfo] = useState(undefined);

  const handleLocationClick = async (event) => {
    const cameraId = event.target.getAttribute('camera-id');
    const selectedLocation = locations.find(location => location.camera_id === cameraId);
    setLocationInfo(selectedLocation);
  };

  return (
    <>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 1
        }}
        spaceBetween={10}
        breakpoints={{
          481: {
            slidesPerView: 3,
            grid: {
              rows: 2
            }
          },
          769: {
            slidesPerView: 4,
            grid: {
              rows: 3
            }
          },
          1201: {
            slidesPerView: 5,
            grid: {
              rows: 3
            },
            spaceBetween: 20
          }
        }}
        pagination={{
          type: 'progressbar'
        }}
        navigation={true}
        modules={[Grid, Pagination, Navigation]}
        className="location-swiper"
      >
        { locations &&
          locations.map((location, index) => {
            return (
              <SwiperSlide
                key={`location-${index}`}
                camera-id={location.camera_id}
                className={ location.camera_id === locationInfo?.camera_id ? 'selected' : '' }
                onClick={handleLocationClick}
              >
                <div className="location-overlay" camera-id={location.camera_id}></div>
                <div
                  className="location-image"
                  style={{ 'backgroundImage': `url(${location.image})` }}
                  camera-id={location.camera_id}
                ></div>
                <div className="location-details">
                  <strong camera-id={location.camera_id}>{location.name}</strong>
                </div>
              </SwiperSlide>
            );
          })
        }
      </Swiper>
    </>
  );
}

export default LocationList;
