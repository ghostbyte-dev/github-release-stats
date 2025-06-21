import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="border-b border-border px-5 py-5">
      <Link href="/" className="">
        Github Release Stats
      </Link>
    </div>
  );
};

export default Navbar;
