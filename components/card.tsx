import { Release } from "@/types/release";

interface CardProps {
  releases: Release[];
}

const Card = ({ releases }: CardProps) => {
  const latestRelease = releases[0];

  return (
    <div className="p-5 bg-neutral-200 rounded-2xl">
      <p>{latestRelease.author.login}</p>
      <span className="font-bold text-3xl">
        {latestRelease.assets[0].download_count}
      </span>
    </div>
  );
};

export default Card;
