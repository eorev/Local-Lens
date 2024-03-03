import React from "react";
import GridItem from "./GridItem";
import { useRouter } from "next/router";

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
  const router = useRouter();
  if (!politicians || politicians.length === 0) {
    return <div>Loading...</div>;
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 5fr)",
    gap: "20px",
    justifyContent: "space-between",
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  };

  function handleClick(
    candidate: string,
    party: string,
    office: string,
    imageUrl: string
  ) {
    router.push({
      pathname: "/GridItemPage",
      query: { candidate, party, office, imageUrl },
    });
  }

  return (
    <div className="flex flex-wrap justify-center mt-4 m-auto space-y-4">
      {politicians.map((politician) => (
        <GridItem
          key={politician.id}
          id={politician.id}
          name={politician.name}
          party={politician.party}
          imageUrl={politician.imageUrl}
          office={politician.office}
          onClick={() =>
            handleClick(
              politician.name,
              politician.party,
              politician.office,
              politician.imageUrl
            )
          }
        />
      ))}
    </div>
  );
};

export default Grid;
