import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Hot weather icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Cold weather icon
import CloudIcon from '@mui/icons-material/Cloud'; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {

  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

    const renderTemperatureIcon = () => {
      if (temperatureCelsius > 23) {
        return <WbSunnyIcon style={{ marginLeft: '10px', fontSize: '5rem', color: 'orange' }} />;
      } else if (temperatureCelsius < 10) {
        return <AcUnitIcon style={{ marginLeft: '10px', fontSize: '5rem', color: 'blue' }} />;
      } else {
        return <CloudIcon style={{ marginLeft: '10px', fontSize: '5rem', color: 'gray' }} />;
      }
    };

    return (
      <div style={{ backgroundColor: '#4B5563', color: 'white', borderRadius: '0.5rem', width: '100%', boxSizing: 'border-box', padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{fontSize:'20px'}}>Now</div>
      <div style={{display: 'flex', alignItems: 'center', fontSize: '60px', fontWeight: 'bold'  }}>
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
        
        </div>
      <div style={{ fontSize: '20px', marginTop: '8px',fontWeight:'500' }}>  {weatherDescription}</div>
      <div style={{ marginTop: '1rem' }}>
      <div style={{display:'flex',alignItems:'center'}}>
       <CalendarMonthIcon/> 
        {currentDate}</div>
      <div style={{marginTop:'4px',display:'flex',alignItems:'center'}}>
      <LocationOnIcon/>
        {cityName}, {countryName}</div>
      </div>
      </div>
    );
  };
  
  export default MainWeatherCard;
  