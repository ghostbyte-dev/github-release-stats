import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="border-b border-border px-2 lg:px-6 py-3 bg-background-dark flex">
      <Link href="/" className="">
        <div className="flex space-x-3 items-center p-2">
          <Image src="/logo.svg" width={48} height={48} className="h-12 w-12 rounded-lg" alt="" />

          <div>
            <span className="font-semibold text-xl">Github Release Stats</span>

            <div className="text-xs font-semibold">A Ghostbyte Production</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
