import React from 'react';
import Button from './Button'; // Assuming Button component exists

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = 'Ajukan',
  cancelText = 'Batal',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs transform transition-all duration-300 scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 active:scale-95"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 active:scale-95"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
