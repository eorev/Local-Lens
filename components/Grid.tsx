// Grid.tsx
import React, { useState, useEffect, useCallback } from "react";
import GridItem from "./GridItem";

// Define a type for the politician data
interface Politician {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
}

const Grid: React.FC = () => {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(false);

  // Use useCallback to memoize the function so it doesn't cause useEffect to re-run
  const fetchPoliticians = useCallback(async () => {
    setLoading(true);
    // Mock fetching logic - replace this with your actual API call
    const newPoliticians: Politician[] = []; // Ensure this is typed correctly based on your API response
    setPoliticians((prev) => [...prev, ...newPoliticians]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPoliticians();
  }, [fetchPoliticians]);

  const handleLoadMore = () => {
    fetchPoliticians();
  };

  const renderGridItems = () => {
    return politicians.map((politician) => (
      <GridItem
        key={politician.id}
        name={politician.name}
        party={politician.party}
        imageUrl={politician.imageUrl}
        onClick={() => console.log("Clicked on", politician.name)}
      />
    ));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
      }}
    >
      {renderGridItems()}
      {loading && <p>Loading...</p>}
      <button onClick={handleLoadMore} style={{ gridColumn: "1 / -1" }}>
        Load More
      </button>
    </div>
  );
};

export default Grid;
