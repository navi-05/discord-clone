
import { Menu } from "lucide-react"

import { Button } from "./ui/button"
import ServerSidebar from "./server/server-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import NavigationSidebar from "./navigation/navigation-sidebar"

const MobileToggle = ({
  serverId
}: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar
          serverId={serverId}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MobileToggle