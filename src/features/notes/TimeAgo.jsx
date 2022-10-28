import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAge = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAge = `${timePeriod} age`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAge}</i>
    </span>
  );
};
