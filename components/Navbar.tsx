import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="container-lg flex items-center justify-between px-8 pt-4 sm:px-20">
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </nav>
  )
}

export default Navbar;