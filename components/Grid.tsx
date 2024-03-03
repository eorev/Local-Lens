import React from "react";
import GridItem from "./GridItem";

interface Politician {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  office: string;
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
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "space-between",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <div style={gridStyle}>
      {politicians.map((politician) => (
        <GridItem
          key={politician.id}
          id={politician.id}
          name={politician.name}
          party={politician.party}
          imageUrl={politician.imageUrl}
          office={politician.office}
          onClick={() => console.log("Clicked on", politician.name)}
        />
      ))}

    </div>
  );
};

export default Grid;