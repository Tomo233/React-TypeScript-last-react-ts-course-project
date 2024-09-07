import { useSessionContext } from "../Context/sessionContext.tsx";
import Button from "../UI/Button.tsx";
import UpcomingSession from "./UpcomingSession.tsx";

type UpcomingSessionsProps = {
  onCloseModal: () => void;
};

export default function UpcomingSessions({
  onCloseModal,
}: UpcomingSessionsProps) {
  const { upcomingSessions } = useSessionContext();

  return (
    <article>
      <h2>Upcoming Sessions</h2>

      <ul>
        {upcomingSessions.map((session) => (
          <li key={session.id}>
            <UpcomingSession session={session} />
          </li>
        ))}
      </ul>

      <p className="actions">
        <Button onClick={onCloseModal}>Close</Button>
      </p>
    </article>
  );
}
