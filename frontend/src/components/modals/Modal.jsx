import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import CloseButton from '../CloseButton';
import AddFriendModal from './AddFriendModal';
import FriendRequestsModal from './FriendRequestsModal';
import ProfileCardModal from './ProfileCardModal';
import ConfirmModal from './ConfirmModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal() {
  const { modals, closeModal } = useModal();
  const [closingIndex, setClosingIndex] = useState(null);

  if(!modals.length) return null;

  const handleCloseModal = (e, index) => {
    e.stopPropagation();
    setClosingIndex(index);
  };

  const handleAnimationModal = (isClosing) => {
    if(isClosing) {
      closeModal();
      setClosingIndex(null); 
    }
  };

  return (
    <AnimatePresence>
      {modals.map(({ type, props }, index) => {
        const zIndex = 50 + index * 10;
        const isClosing = closingIndex === index;

        return (
          <motion.div
            key={index}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-0"
            style={{ zIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05, ease: 'easeOut' }}
            onClick={(e) => handleCloseModal(e, index)}
          >
            <motion.div
              className="bg-slate-800 backdrop-blur-lg rounded-2xl p-8 shadow-2xl min-w-[24rem] mx-4 relative origin-center"
              initial={{ opacity: 0, scale: 0.75, y: 0 }}
              animate={{
                opacity: isClosing ? 0 : 1,
                scale: isClosing ? 0.9 : 1,
                y: isClosing ? 10 : 0,
              }}
              transition={{ duration: 0.05, ease: 'easeOut' }}
              onAnimationComplete={() => handleAnimationModal(isClosing)}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={(e) => handleCloseModal(e, index)} />

              <div className="mt-0">
                {type === 'add-friend' && (
                  <AddFriendModal onClose={(e) => handleCloseModal(e, index)} />
                )}
                {type === 'friend-requests' && (
                  <FriendRequestsModal onClose={(e) => handleCloseModal(e, index)} />
                )}
                {type === 'profile-card' && (
                  <ProfileCardModal
                    onClose={(e) => handleCloseModal(e, index)}
                    user={props.user}
                  />
                )}
                {type === 'confirm' && (
                  <ConfirmModal {...props} onCancel={(e) => handleCloseModal(e, index)} />
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
