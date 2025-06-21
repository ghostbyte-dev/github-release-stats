import type { Reactions } from '@/types/release';

type ReactionsProps = {
  reactions: Reactions;
};

const ReactionsComponent = ({ reactions }: ReactionsProps) => {
  const reactionsList: { emoji: string; count: number }[] = [
    { emoji: '👍', count: reactions['+1'] },
    { emoji: '👎', count: reactions['-1'] },
    { emoji: '😄', count: reactions.laugh },
    { emoji: '🎉', count: reactions.hooray },
    { emoji: '😕', count: reactions.confused },
    { emoji: '♥️', count: reactions.heart },
    { emoji: '🚀', count: reactions.rocket },
    { emoji: '👀', count: reactions.eyes },
  ];

  const getSumOfReactions = () => {
    const listOfReactionNumber = reactionsList.map((reactionItem) => reactionItem.count);
    return listOfReactionNumber.reduce((prev: number, current: number) => prev + current);
  };

  return (
    <div className="flex flex-row gap-2 items-center flex-wrap">
      {reactionsList.map((reactionItem: { emoji: string; count: number }) => {
        if (reactionItem.count > 0) {
          return (
            <div key={reactionItem.emoji}>
              <span className="badge text-secondary-text border-border py-1 px-2 text-md">
                {reactionItem.emoji} {reactionItem.count}
              </span>
            </div>
          );
        }
      })}
      <p className="text-secondary-text text-sm">{getSumOfReactions()} people reacted</p>
    </div>
  );
};

export default ReactionsComponent;
