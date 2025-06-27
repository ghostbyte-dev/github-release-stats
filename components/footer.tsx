import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full border-t border-border py-10 mt-10 flex justify-center">
      <div className="font-semibold">
        A{' '}
        <Link
          href="https://ghostbyte.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Ghostbyte
        </Link>{' '}
        Production
      </div>
    </div>
  );
};

export default Footer;
