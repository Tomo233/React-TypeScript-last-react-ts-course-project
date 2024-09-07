import { useSessionContext } from "../Context/sessionContext.tsx";
import Button from "../UI/Button.tsx";
import { Session } from "./SessionsList.tsx";

type UpcomingSessionProps = {
  session: Session;
};

export default function UpcomingSession({ session }: UpcomingSessionProps) {
  const { cancelSession } = useSessionContext();

  const handleCancelSession = () => {
    cancelSession(session.id);
  };

  return (
    <article className="upcoming-session">
      <div>
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
        <time dateTime={new Date(session.date).toISOString()}>
          {new Date(session.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      <p className="actions">
        <Button textOnly onClick={handleCancelSession}>
          Cancel
        </Button>
      </p>
    </article>
  );
}
