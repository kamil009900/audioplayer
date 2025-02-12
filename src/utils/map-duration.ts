export const mapDuration = ({
  seconds,
  sign,
}: {
  seconds?: number;
  sign?: string;
}) => {
  if (!seconds) {
    return '0:00';
  }

  const flooredSeconds = Math.floor(seconds);

  const minutes = Math.floor(flooredSeconds / 60);
  let remainingSeconds = flooredSeconds % 60;
  if (remainingSeconds < 0) {
    remainingSeconds = 0;
  }
  const mappedRemainingSeconds =
    remainingSeconds.toString().length === 1
      ? `0${remainingSeconds}`
      : remainingSeconds;

  if (minutes < 1) {
    return `${sign ? sign : ''}0:${mappedRemainingSeconds}`;
  }

  return `${sign ? sign : ''}${minutes}:${mappedRemainingSeconds}`;
};
