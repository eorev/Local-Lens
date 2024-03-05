// TeamMemberCard.tsx
import React from 'react';
import Image from 'next/image';

interface TeamMemberCardProps {
    name: string;
    role: string;
    imageUrl: string;
    linkedInUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, imageUrl, linkedInUrl }) => {
    const imageWidth = 400;
    const imageHeight = 400;

    return (
        <div className="flex flex-col h-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="rounded-t-lg overflow-hidden">
                <Image src={imageUrl} alt={name} width={imageWidth} height={imageHeight} objectFit="cover" />
            </div>
            <div className="p-5 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{role}</p>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="self-center mb-5 inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out">
                LinkedIn
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.67 0H3.33C1.49 0 0 1.49 0 3.33v13.34C0 18.51 1.49 20 3.33 20h13.34c1.84 0 3.33-1.49 3.33-3.33V3.33C20 1.49 18.51 0 16.67 0zM6.67 17H3.33V7.33h3.34V17zM5 5.67a1.96 1.96 0 11-.0003-3.921A1.96 1.96 0 015 5.67zm11.67 11.33h-3.34V12c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.29-1.91 2.64v4.76h-3.34V7.33h3.2v1.32h.05c.45-.85 1.54-1.66 3.17-1.66 3.39 0 4.02 2.23 4.02 5.12v5.91z"></path></svg>
            </a>
        </div>
    );
};

export default TeamMemberCard;
