"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "./ui/dropdown-menu";
import { NavigationMenuItem,NavigationMenu,NavigationMenuList,NavigationMenuLink } from "./ui/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

  function AuthButton(){
    const { data: session, status } = useSession(); //the server session
    //sign in or out depending upon session
    return (
      <>
             <NavigationMenu className="h-16 overflow-hidden p-4">
          <NavigationMenuList className="flex w-screen items-center justify-between gap-4 px-4 md:px-8">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="font-extrabold italic text-blue-300">
                  Nizzroom
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {session && session.user ? (
              <div className="item-center flex justify-center gap-4">
                <NavigationMenuItem>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`${session?.user?.image}`}
                        />
                      </Avatar>
                      <span className="hidden md:block">
                        {session?.user?.name ?? session?.user?.email}
                      </span>{" "}
                      <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {session?.user?.name ? (
                          `@${session?.user?.name}`
                        ) : (
                          <span className="italic text-neutral-950 dark:text-neutral-50">
                            No name set
                          </span>
                        )}
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem> */}
                      {/* <DropdownMenuItem>
                        <Link className="h-full w-full" href={`/@${auth.user.username}/settings`}>Settings</Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem>
                        <Button onClick={() => {signOut()}}>Sign Out</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </div>
            ) : (
                <Button onClick={() => {signIn()}}>Sign In</Button>
            )}
          </NavigationMenuList>
        </NavigationMenu>
            </>
      );
}

export default function NavMenu(){
    return(
        <div>
            <AuthButton/>
        </div>
    )
}