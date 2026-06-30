import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#374151",
        color: "white",
        borderRadius: "10px",
        padding: "24px",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "22px",
          color: "#D1D5DB",
          paddingBottom: "15px",
        }}
      >
        {title}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          paddingTop: "15px",
        }}
      >
        <Icon style={{ fontSize: "50px" }} />

        <span
          style={{
            fontSize: "32px",
            fontWeight: "600",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default HighlightBox;