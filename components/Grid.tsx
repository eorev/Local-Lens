import React from "react";
import GridItem from "./GridItem";

// Extend the Politician interface if needed
interface Politician {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
}

// Update props to include politicians
interface GridProps {
  politicians: Politician[];
}

const Grid: React.FC<GridProps> = ({ politicians }) => {
  if (!politicians || politicians.length === 0) {
    // Render a loading indicator or a placeholder message
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
      }}
    >
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
