import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function ModalWindow({ children, open }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={styles.modal} id="modal">
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
