import React from 'react';
import Image from 'next/image';

// Assuming your existing GridItemProps interface
interface GridItemProps {
    name: string;
    party: string;
    imageUrl: string;
    onClick: () => void;
}

const GridItem: React.FC<GridItemProps> = ({ name, party, imageUrl, onClick }) => {
    // Define default width and height for images
    const imageWidth = 200; // Example width
    const imageHeight = 300; // Example height

    return (
        <div className="grid-item" onClick={onClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
            {/* Update Image component to include width and height */}
            <img
                src={imageUrl}
                alt={name}
                width={imageWidth}
                height={imageHeight}
                style={{ marginBottom: '8px' }}
            />
            <h3 style={{ margin: '0 0 4px 0' }}>{name}</h3>
            <p style={{ margin: 0 }}>{party}</p>
        </div>
    );
};

export default GridItem;
