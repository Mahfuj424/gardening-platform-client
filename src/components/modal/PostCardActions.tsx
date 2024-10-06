import React from 'react';

interface OptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const PostCardActions: React.FC<OptionsModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-[300px]">
        <ul>
          <li className="cursor-pointer py-2 hover:bg-gray-100" onClick={onClose}>Save Post</li>
          <li className="cursor-pointer py-2 hover:bg-gray-100" onClick={onClose}>Edit Post</li>
          <li className="cursor-pointer py-2 hover:bg-gray-100 text-red-500" onClick={onDelete}>Delete Post</li>
        </ul>
        <button className="mt-3 text-center w-full py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PostCardActions;
