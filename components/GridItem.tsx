// GridItem.tsx
import React from 'react';
import Image from 'next/image';

// Define a type for the props expected by GridItem
interface GridItemProps {
    name: string;
    party: string;
    imageUrl: string;
    onClick: () => void;
}

const GridItem: React.FC<GridItemProps> = ({ name, party, imageUrl, onClick }) => {
    return (
        <div className="grid-item" onClick={onClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <Image src={imageUrl} alt={name} style={{ width: '100%', height: 'auto', marginBottom: '8px' }} />
            <h3 style={{ margin: '0 0 4px 0' }}>{name}</h3>
            <p style={{ margin: 0 }}>{party}</p>
        </div>
    );
};

export default GridItem;
