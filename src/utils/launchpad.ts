export const getRoundSale = (rounds: Round[], now: Date) => {
  const roundsSale = rounds?.filter((round) => round.type !== 'Campaign time');
  for (const schedule of roundsSale) {
    if (
      schedule.startTime &&
      schedule.endTime &&
      new Date(schedule.startTime) <= now &&
      now <= new Date(schedule.endTime)
    ) {
      return schedule;
    } else if (!schedule.startTime && now <= new Date(schedule.endTime)) {
      return schedule;
    } else if (!schedule.endTime && new Date(schedule.startTime) <= now) {
      return schedule;
    }
  }
  return null;
};
