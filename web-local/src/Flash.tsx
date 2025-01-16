import React from "react";

interface FlashProps {
  message: string | undefined
}

const Flash = ({message}: FlashProps) => {
  const modalRef = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    if (!message) return
    const modalElement = modalRef.current
    if (!modalElement) return

    modalElement.showModal()
  }, [message])

  if (!message) {return}

  return (
    <dialog ref={modalRef} style={{margin: "auto", padding: "auto"}}>
      {message}
    </dialog>
  );
}

export default Flash