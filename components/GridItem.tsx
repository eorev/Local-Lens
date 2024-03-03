import React from 'react';
import { CSSProperties } from 'react';
import { FaUserCircle } from "react-icons/fa";

interface GridItemProps {
    name: string;
    party: string;
    imageUrl: string;
    onClick: () => void;
}

const GridItem: React.FC<GridItemProps> = ({ name, party, imageUrl, onClick }) => {
    const imageWidth = 80; // Adjusted to make the image slightly smaller
    const imageHeight = 80; // Adjusted to maintain aspect ratio

    const cardStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        backgroundColor: 'white',
        cursor: 'pointer',
        width: '350px', // Adjust this value to control the card width
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            {imageUrl ? (
                <img src={imageUrl} alt={name} style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
                <FaUserCircle size={imageWidth} style={{ marginBottom: '8px' }} />
            )}
            <h3 style={{ margin: '10px 0 5px 0' }}>{name}</h3>
            <p style={{ margin: 0, color: 'grey' }}>{party}</p>
        </div>
    );
};

export default GridItem;
