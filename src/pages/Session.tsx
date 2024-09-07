import { FormEvent, useRef } from "react";
import { useParams } from "react-router-dom";

import { SESSIONS } from "../dummy-sessions.ts";
import Button from "../components/UI/Button.tsx";
import Modal, { ModalRef } from "../components/UI/Modal.tsx";
import Input from "../components/UI/Input.tsx";
import { useSessionContext } from "../components/Context/sessionContext.tsx";
import { Session } from "../components/Sessions/SessionsList.tsx";

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const sessionRef = useRef<ModalRef>(null);
  const sessionId = params.id;
  const loadedSession: Session = SESSIONS.find(
    (session) => session.id === sessionId
  )!;
  const { bookSession, upcomingSessions } = useSessionContext();

  console.log(upcomingSessions);

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  const openSessionModal = () => {
    sessionRef.current?.openModal();
  };

  const closeSessionModal = () => {
    sessionRef.current?.closeModal();
  };

  const handleBookSession = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    bookSession(loadedSession);
    closeSessionModal();
  };

  return (
    <main id="session-page">
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <p>
              <Button onClick={openSessionModal}>Book Session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
        <Modal ref={sessionRef}>
          <div>
            <h2>Book Session</h2>
            <form onSubmit={handleBookSession}>
              <Input
                labelContent="Your name"
                id="name"
                name="name"
                type="text"
              />
              <Input
                labelContent="Your email"
                id="email"
                name="email"
                type="email"
              />
              <p className="actions">
                <Button type="button" onClick={closeSessionModal}>
                  Cancel
                </Button>
                <Button>Book Session</Button>
              </p>
            </form>
          </div>
        </Modal>
      </article>
    </main>
  );
}
