// Team.tsx
import React from 'react';
import TeamMemberCard from "@/components/TeamMemberCard"

const teamMembers = [
    {
        name: 'Ethan Orevillo',
        role: 'Frontend / Backend Work',
        imageUrl: 'https://media.licdn.com/dms/image/D4E03AQFww1P-RWrGyw/profile-displayphoto-shrink_400_400/0/1684346583959?e=1715212800&v=beta&t=EDWRcvpNs_25Q_8cDfJMuzDhVdT9iNZ7fI2QEh_SqPk',
        linkedInUrl: 'https://www.linkedin.com/in/ethan-orevillo/',
    },
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
