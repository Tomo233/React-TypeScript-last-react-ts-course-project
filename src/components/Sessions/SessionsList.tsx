import SessionItem from "./SessionItem";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description?: string;
  duration?: number;
  date: string;
  image?: string;
};

type SessionsListProps = {
  sessions: Session[];
};

function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div>
      <ul id="sessions-list">
        {sessions.map((session) => (
          <SessionItem session={session} key={session.id} />
        ))}
      </ul>
    </div>
  );
}

export default SessionsList;
