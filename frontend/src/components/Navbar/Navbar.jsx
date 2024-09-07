import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { Link } from "react-router-dom";
import { ModeToggle } from '@/components/mode-toggle'

const routes = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Environment",
    href: "/environment"
  }
]

export default function Navbar() {
  return (
    <main className="flex justify-between md:p-2">
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
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <section className="flex gap-3">
        <ModeToggle />
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="outline">Signup</Button>
        </Link>
      </section>
    </main>
  )
}

function Logo() {
  return (
    <div className="text-3xl font-semibold">EDU-AR</div>
  )
}