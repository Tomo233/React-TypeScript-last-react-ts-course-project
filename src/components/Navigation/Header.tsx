import Button from "../UI/Button";
import Modal, { ModalRef } from "../UI/Modal";
import { useRef } from "react";
import UpcomingSessions from "../Sessions/UpcomingSessions";
import { useSessionContext } from "../Context/sessionContext";

function Header() {
  const dialogRef = useRef<ModalRef>(null);
  const { upcomingSessions } = useSessionContext();
  console.log(upcomingSessions);
  const handleOpenModal = () => {
    dialogRef.current!.openModal();
  };

  const handleCloseModal = () => {
    dialogRef.current!.closeModal();
  };

  return (
    <header id="main-header">
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <li>
            <Button url="/" textOnly={true}>
              Our Mission
            </Button>
          </li>
          <li>
            <Button url="/sessions" textOnly={true}>
              Browse Sessions
            </Button>
          </li>
          <li>
            <Button textOnly={false} onClick={handleOpenModal}>
              Upcoming Sessions
            </Button>
          </li>
        </ul>
      </nav>

      <Modal ref={dialogRef}>
        {upcomingSessions.length > 0 ? (
          <UpcomingSessions onCloseModal={handleCloseModal} />
        ) : (
          <div>
            <Button onClick={handleCloseModal}>Close</Button>
            <p>No sessions found</p>
          </div>
        )}
      </Modal>
    </header>
  );
}

export default Header;
