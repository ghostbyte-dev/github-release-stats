import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="border-b border-border px-5 py-5 bg-background-dark">
      <Link href="/" className="">
        <span className="font-semibold">Github Release Stats</span>
      </Link>
    </div>
  );
};

export default Navbar;
