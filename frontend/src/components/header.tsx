import Link from "'next/link'"
import { Bell } from "'lucide-react'"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">Logo</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h3 className="font-medium leading-none">Notifications</h3>
                  <div className="grid gap-2">
                    <div className="flex items-start gap-4 rounded-lg p-2 hover:bg-gray-100">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                        <AvatarFallback>UD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">New message from User123</p>
                        <p className="text-sm text-gray-500">Hey, how's it going?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg p-2 hover:bg-gray-100">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder-avatar-2.jpg" alt="Avatar" />
                        <AvatarFallback>SY</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">System Update</p>
                        <p className="text-sm text-gray-500">Your account has been upgraded.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Avatar className="ml-4">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

