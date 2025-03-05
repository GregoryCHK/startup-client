import React from 'react'

interface BasicModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: React.ReactNode,
};

function BasicModal({isOpen, onClose, title, children} : BasicModalProps) {
    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' onClick={onClose}>
        <div className='bg-background rounded-lg px-4 py-6 shadow-lg min-w-[60%] relative' onClick={(e) => e.stopPropagation()}>
            <h2 className='text-center font-bold  text-custom-secondary'>{title}</h2>
            {children}

            <div className="mt-6 flex justify-center ">
                <button className="bg-custom-secondary hover:bg-custom text-white px-4 py-1 rounded-2xl w-[50%]" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    </div>
  )
}



export default BasicModal
