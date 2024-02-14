# weather-forecast-and-traffic-cam
The application for user to check the location info and weather forecast by selected date and time.

## Getting Set Up

### Prerequisites

* Ensure you have recent versions of `node`, `npm` and `docker` installed.
  * Node.js - https://nodejs.org/en/download/current
  * Docker - https://www.docker.com/products/docker-desktop/

### Installation

1. Clone the project.
```
git clone https://github.com/KahChee/weather-forecast-and-traffic-cam.git
```

2. Ensure your `docker` service is started. To verify that:
```
docker --version

# You should see a message like this, Docker version 25.0.2, build 29cf629
```

3. Start docker database service.
```
cd weather-forecast-and-traffic-cam
docker compose up weather-forecast-and-traffic-cam-database -d
```

4. Install backend service dependencies.
```
cd service
npm install
```

5. Create `service/.env` from `service/.env.example` and ensure the following field is inside:
```
DATABASE_URL
```

6. Run database table migration.
```
npx prisma migrate dev
```

7. Start the backend service.
```
npm start
```

8. Install frontend ui dependencies.
```
cd web
npm install
```

9. Create `web/.env` from `web/.env.example` and ensure the following field is inside:
```
REACT_APP_SERVICE_API_URL
```

10. Start the frontend ui.
```
npm start
```

### Report APIs

1. To retrieve the most recent 10 date time + location searched by all users consolidated.
```
/v1/report/get/most-recent-ten-search
```

2. To retrieve the top 10 date time + location searched within a period. Example:
```
/v1/report/get/top-ten-search-within-the-period?startDateTime=2024-02-08T08:00:00&endDateTime=2024-02-08T12:00:00
```

3. To retrieve the period of which there are most searches performed. Example:
```
# This is to get most searches performed in 1 hour period.
# period = hour * minute

/v1/report/get/most-search-within-the-period?startDateTime=2024-02-08T08:00:00&endDateTime=2024-02-08T12:00:00&period=60
```
