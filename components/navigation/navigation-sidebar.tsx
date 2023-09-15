import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { Separator } from "../ui/separator"
import { ModeToggle } from "../mode-toggle"
import { ScrollArea } from "../ui/scroll-area"
import NavigationItem from "./navigation-item"
import NavigationAction from "./navigation-action"
import { currentProfile } from "@/lib/current-profile"

const NavigationSidebar = async () => {

  const profile = await currentProfile()
  if(!profile) return redirect('/')

  // * Finding the servers in which the currentUser is a member of.
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#e3e5e8] dark:bg-[#1E1f22] py-3"
    >
      <NavigationAction />
      <Separator 
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea
        className="flex-1 w-full"
      >
        {servers.map((server) => (
          <div
            key={server.id}
            className="mb-4"
          >
            <NavigationItem 
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]'
            }
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar