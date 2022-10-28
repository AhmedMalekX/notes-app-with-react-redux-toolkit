import { useDispatch } from "react-redux";
import { addReaction } from "./notesSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

export const ReactionButtons = ({ note }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(addReaction({ noteId: note.id, reaction: name }))
        }
      >
        {emoji} {note.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
