import React from "react";
import { CSSProperties } from "react";
import { FaUserCircle } from "react-icons/fa";

interface GridItemProps {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  office: string;
  onClick: () => void;
}

const isValidHttpUrl = (string: any) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const GridItem: React.FC<GridItemProps> = ({
  name,
  party,
  imageUrl,
  office,
  onClick,
}) => {
  const imageWidth = 80;
  const imageHeight = 80;

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "white",
    cursor: "pointer",
    minWidth: "350px",
    minHeight: "300px",
    margin: "10px",
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {isValidHttpUrl(imageUrl) ? (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <FaUserCircle size={imageWidth} style={{ marginBottom: "8px" }} />
      )}
      <h3 style={{ margin: "10px 0 5px 0" }}>{name}</h3>
      <p style={{ margin: "0", color: "grey" }}>{party}</p>
      <p style={{ margin: "0", color: "#007BFF" }}>{office}</p>
    </div>
  );
};

export default GridItem;
