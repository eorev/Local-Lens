// Team.tsx
import React from 'react';
import TeamMemberCard from "@/components/TeamMemberCard"

const teamMembers = [
    {
        name: 'Ethan Orevillo',
        role: 'Frontend / Backend Work',
        imageUrl: '/path/to/image',
        linkedInUrl: 'https://www.linkedin.com/in/filler',
    },
    // Add more team members as needed
];

const Team = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            <h1 className="w-full text-4xl font-bold text-center">Our Team</h1>
            {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} imageUrl={member.imageUrl} linkedInUrl={member.linkedInUrl} />
            ))}
        </div>
    );
};

export default Team;
