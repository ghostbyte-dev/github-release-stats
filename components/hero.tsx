const Hero = () => {
  return (
    <div className="flex flex-col mt-8 mb-8 lg:items-start items-center  text-center lg:text-start">
      <h1 className="font-bold text-3xl sm:text-5xl text-primary mb-3">Github Release Stats</h1>
      <p className="text-lg sm:text-xl">Find detailed stats about any Github repositories</p>
      <div className="mt-6">
        <a
          href="https://www.producthunt.com/products/github-release-stats-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-github&#0045;release&#0045;stats&#0045;2"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=992887&theme=neutral&t=1752524324408"
            alt="Github&#0032;Release&#0032;Stats - Check&#0032;the&#0032;release&#0032;stats&#0032;of&#0032;any&#0032;Github&#0032;repository | Product Hunt"
            style={{ width: '250px', height: '54px' }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
