import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Hero from '../components/hero';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

export default function Home() {
    getLocation();
    return (
        <Layout title="Home" description="The homepage of local lens.">
            <Head>
                <title>Local Lens</title>
                <meta name="description" content="Understand your local politicians and how you can leverage your rights to vote." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Hero />
        </Layout>
    );
}