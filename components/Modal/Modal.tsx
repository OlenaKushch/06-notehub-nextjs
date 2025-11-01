'use client';


import { createPortal } from "react-dom";

import { useEffect, useState } from "react";
import css from './Modal.module.css';


interface ModalProps {
  onClose: () => void,
  children: React.ReactNode;
}



export default function Modal({ onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root');
    setModalRoot(root);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) { onClose(); }
  };
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}

    >
      <div className={css.modal}>
        {children}
      </div>
    </div>, modalRoot);
}
