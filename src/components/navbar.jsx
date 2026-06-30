import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Navbar = ({ onSearch, onCurrentLocation }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onCurrentLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        alert("Unable to fetch your location.");
      }
    );
  };

  return (
    <nav
      style={{
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "22px 25px",
        display: "grid",
        gridTemplateColumns: "220px 1fr 220px",
        alignItems: "center",
        gap: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "white",
        }}
      >
        <FilterDramaTwoToneIcon
          style={{
            fontSize: "34px",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "700",
            letterSpacing: ".5px",
          }}
        >
          Weather
        </h1>
      </div>

      {/* Search Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search city..."
          size="medium"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: "8px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "52px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{
            backgroundColor: "#4B5550",
            height: "52px",
            minWidth: "120px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,

            "&:hover": {
              backgroundColor: "#3d4542",
            },
          }}
        >
          Search
        </Button>
      </div>

      {/* Current Location */}
      <Button
        variant="contained"
        startIcon={<GpsFixedIcon />}
        onClick={handleCurrentLocation}
        sx={{
          backgroundColor: "#4B5550",
          height: "52px",
          width: "100%",
          borderRadius: "8px",
          textTransform: "none",
          fontSize: "15px",
          fontWeight: 600,

          "&:hover": {
            backgroundColor: "#3d4542",
          },
        }}
      >
        Current Location
      </Button>
    </nav>
  );
};

export default Navbar;