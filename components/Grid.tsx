import React from "react";
import GridItem from "./GridItem";

interface Politician {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
}

interface GridProps {
  politicians: Politician[];
}

const Grid: React.FC<GridProps> = ({ politicians }) => {
  if (!politicians || politicians.length === 0) {
    return <div>Loading...</div>;
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Ensure 3 items per row
    gap: "20px", // Adjust gap for spacing between items
    justifyContent: "space-between", // This ensures equal spacing around items
    padding: "20px", // Add some padding around the grid for better appearance
    maxWidth: "1200px", // Adjust maximum width to ensure cards are decently sized
    margin: "0 auto", // Center the grid container
  };

  return (
    <div style={gridStyle}>
      {politicians.map((politician) => (
        <GridItem
          key={politician.id}
          name={politician.name}
          party={politician.party}
          imageUrl={politician.imageUrl}
          onClick={() => console.log("Clicked on", politician.name)}
        />
      ))}
    </div>
  );
};

export default Grid;
