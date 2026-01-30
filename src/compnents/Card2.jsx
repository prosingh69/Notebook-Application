import React, { useState } from 'react' 
import { CircleX, FilePenLine, Check } from 'lucide-react';

const Card2 = ({ data, onClose, onSave }) => {
  // State for toggling edit mode and holding edited values
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: data.title, para: data.para });

  const handleSave = () => {
    onSave(editedNote); // Parent component ko naya data bhej rhe hain
    setIsEditing(false); // Edit mode band
  };

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='relative border border-gray-600 bg-[#121212] w-full max-w-lg rounded-2xl p-6 lg:p-10 shadow-2xl transition-all'>
        
        {/* Title: Text ya Input */}
        {isEditing ? (
          <input 
            className="w-full bg-transparent border-b-2 border-yellow-500 text-3xl font-bold py-4 text-white uppercase focus:outline-none"
            value={editedNote.title}
            onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
          />
        ) : (
          <h1 className='text-3xl font-bold py-4 border-b-2 border-yellow-500 text-white uppercase wrap-break-words'>
            {data?.title}
          </h1>
        )}

        <div className='max-h-[60vh] overflow-y-auto mt-4 pr-2 custom-scrollbar'>
          {isEditing ? (
            <textarea 
              className="w-full bg-transparent text-gray-300 text-[18px] font-medium leading-relaxed focus:outline-none h-40 resize-none"
              value={editedNote.para}
              onChange={(e) => setEditedNote({...editedNote, para: e.target.value})}
            />
          ) : (
            <p className='text-[18px] font-medium text-gray-300 leading-relaxed whitespace-pre-wrap'>
              {data?.para}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end mt-4 gap-4'>
          {isEditing ? (
            <button onClick={handleSave} className='flex items-center font-bold text-green-400 border border-green-400 py-1 px-3 rounded-[10px] cursor-pointer'>
              SAVE <Check size={20} className="ml-1" />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className='flex items-center font-bold border-amber-300 text-amber-300 border py-1 px-3 rounded-[10px] cursor-pointer'>
              EDIT <FilePenLine className="ml-1" size={20} />
            </button>
          )}
        </div>

        <button onClick={onClose} className='absolute top-5 right-5 text-white hover:text-red-500'>
          <CircleX size={35} />
        </button>
      </div>
    </div>
  )
}
export default Card2;