

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[300px]">
        <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
        <p className="mb-6">Do you really want to delete this post? This action cannot be undone.</p>
        <div className="flex justify-between">
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
