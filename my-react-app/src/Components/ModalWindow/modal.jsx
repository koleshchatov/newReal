import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function ModalWindow({ className, open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={className} id="modal">
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
