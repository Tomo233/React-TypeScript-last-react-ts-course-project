import Button from "../UI/Button";
import { Session } from "./SessionsList";

type SessionItemProps = {
  session: Session;
};

function SessionItem({ session }: SessionItemProps) {
  const { id, title, image, summary } = session;

  return (
    <article className="session-item">
      <img src={image} alt={title} />
      <div className="session-data">
        <div>
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
        <p className="actions">
          <Button url={id}>Learn More</Button>
        </p>
      </div>
    </article>
  );
}

export default SessionItem;
