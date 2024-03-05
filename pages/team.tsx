// Team.tsx
import "@/styles/global.css"
import React from 'react';
import TeamMemberCard from "@/components/TeamMemberCard"
import Layout from '@/components/layout';

const teamMembers = [
    {
        name: 'Ethan Orevillo',
        role: 'Frontend / Backend Work',
        imageUrl: 'https://media.licdn.com/dms/image/D4E03AQFww1P-RWrGyw/profile-displayphoto-shrink_400_400/0/1684346583959?e=1715212800&v=beta&t=EDWRcvpNs_25Q_8cDfJMuzDhVdT9iNZ7fI2QEh_SqPk',
        linkedInUrl: 'https://www.linkedin.com/in/ethan-orevillo/',
    },
    {
        name: 'Gage Schuster',
        role: 'Frontend / Backend Work / Database Integrations',
        imageUrl: 'https://media.licdn.com/dms/image/D4E03AQEsYR_HY9xf6g/profile-displayphoto-shrink_400_400/0/1671740477436?e=1715212800&v=beta&t=i0A8zhWEhPPcUPVLNx8G4YtCthnirE3YOZmF4zXyWhw',
        linkedInUrl: 'https://www.linkedin.com/in/gage-schuster-a902081b3/',
    },
    {
        name: 'Dan Deflores',
        role: 'API Integrations / Backend / Frontend Work',
        imageUrl: 'https://media.licdn.com/dms/image/D4E03AQECZPUcW-cWzQ/profile-displayphoto-shrink_400_400/0/1677876776806?e=1715212800&v=beta&t=T6E96FHiEfh24B0jUMhs96KOsNsvoJBHEUIRa6hCpm0',
        linkedInUrl: 'https://www.linkedin.com/in/danieldeflores/',
    },
    {
        name: 'Dan Fazzari',
        role: 'Frontend Work',
        imageUrl: 'https://media.licdn.com/dms/image/C4E03AQF3OKy60w7tkg/profile-displayphoto-shrink_400_400/0/1634681800332?e=1715212800&v=beta&t=UJoKh4V5VvOnUsuL-DujJ2wrjEleSXwINHbICPLZWCY',
        linkedInUrl: 'https://www.linkedin.com/in/daniel-fazzari/',
    },
];

const Team = () => {
    return (
        <Layout title="Our Team" description="Meet the team behind Local Lens.">
            <div className="flex flex-wrap justify-center gap-4 p-4">
                <h1 className="w-full text-4xl font-bold text-center mb-8">Our Team</h1>
                {teamMembers.map((member, index) => (
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4" key={index}>
                        <TeamMemberCard name={member.name} role={member.role} imageUrl={member.imageUrl} linkedInUrl={member.linkedInUrl} />
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default Team;
