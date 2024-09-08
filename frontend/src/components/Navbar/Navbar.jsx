import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from '@/components/mode-toggle';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Route items for the Navbar
const routes = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Quiz",
    href: "/quiz",
  },
  {
    title: "AR",
    href: "/ar",
  },
];

// Chapters dropdown content
const chapters = [
  {
    title: "Geometry (kids)",
    href: "/topics/geometry-kids",
    description: "Learn basic shapes and geometry concepts in a fun way.",
  },
  {
    title: "Solar System",
    href: "/topics/solar-system",
    description: "Explore the planets, moons, and stars of our solar system.",
  },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set login status based on the presence of 'user' in localStorage
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/signout');
      localStorage.removeItem('user');
      navigate('/login');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <main className="flex justify-between md:p-2 fixed z-[200] w-full bg-transparent backdrop-blur-md">
      <section className="flex justify-center items-center gap-10">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {routes.map(({ title, href }, idx) => (
                <Link key={idx} to={href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {chapters.map(({ title, href, description }) => (
                    <li key={title}>
                      <Link
                        to={href}
                        className="block p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200"
                      >
                        <span className="font-semibold">{title}</span>
                        <p>{description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>

            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <section className="flex gap-3">
        <ModeToggle />
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline">Signup</Button>
            </Link>
          </>
        ) : (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </section>
    </main>
  );
}

function Logo() {
  return (
    <div className="text-4xl font-semibold">EDU-AR</div>
  );
}
