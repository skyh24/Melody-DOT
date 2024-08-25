import Link from "next/link";
import { Button } from "./ui/button";

//components
import Nav from "./Nav";
import MobilNav from "./MobilNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-10 text-white">
      <div className="container mx-auto flex justify-between otems-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Melody-DOT <span className="text-accent">.</span>
          </h1>
        </Link>

        {/* nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Nav />
        </div>
        {/* mobile nav */}
        <div className="lg:hidden ">
          <MobilNav />
        </div>

        {/* subwallet */}
        <Button>Subwallet</Button>
      </div>
    </header>
  );
};

export default Header;
