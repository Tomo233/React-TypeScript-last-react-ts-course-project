import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

const Modal = forwardRef<ModalRef, ModalProps>(function Modal(
  { children },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialogRef.current?.showModal();
      },
      closeModal() {
        dialogRef.current?.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    document.querySelector("#modal-root")!
  );
});

export default Modal;
