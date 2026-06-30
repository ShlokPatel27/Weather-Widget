import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "./Highlightbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;

  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      Icon: InvertColorsIcon,
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: CompressIcon,
    },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        width: "100%",
        borderRadius: "10px",
        padding: "25px",
        boxSizing: "border-box",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px 0",
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        Today's Highlights
      </h2>

      {/* Top Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flex: 1,
        }}
      >
        {/* Air Quality */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#374151",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "24px" }}>Air Quality Index</h3>

            <div
              style={{
                backgroundColor: "green",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <AirIcon style={{ fontSize: "70px" }} />

            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "15px",
                textAlign: "center"
              }}
            >
              <div>
                <strong style={{ fontSize: "22px" }}>CO</strong>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0 0 0" }}>{co}</p>
              </div>

              <div>
                <strong style={{ fontSize: "22px" }}>NO</strong>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0 0 0" }}>{no}</p>
              </div>

              <div>
                <strong style={{ fontSize: "22px" }}>NO₂</strong>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0 0 0" }}>{no2}</p>
              </div>

              <div>
                <strong style={{ fontSize: "22px" }}>O₃</strong>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0 0 0" }}>{o3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sunrise */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#374151",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "24px" }}>Sunrise And Sunset</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <WbSunnyIcon style={{ fontSize: "70px" }} />
              <p
                style={{
                  fontSize: "30px",
                  marginTop: "15px",
                  margin: "15px 0 0 0",
                  fontWeight: "bold"
                }}
              >
                {new Date(sys.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <NightsStayIcon style={{ fontSize: "70px" }} />
              <p
                style={{
                  fontSize: "30px",
                  marginTop: "15px",
                  margin: "15px 0 0 0",
                  fontWeight: "bold"
                }}
              >
                {new Date(sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          flex: 1,
        }}
      >
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;