import { useModal } from '../../context/ModalContext';
import CloseButton from '../CloseButton';
import AddFriendModal from './AddFriendModal';
import FriendRequestsModal from './FriendRequestsModal';
import ProfileCardModal from './ProfileCardModal';

export default function Modal() {
  const { modalType, modalProps, closeModal } = useModal();

  if (!modalType) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 z-50 animate-in fade-in duration-200"
      onClick={() => closeModal()}
    >
      <div 
        className="bg-slate-800 backdrop-blur-lg rounded-2xl p-8 shadow-2xl min-w-[24rem] mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={closeModal} />

        {/* Modal Content */}
        <div className="mt-0">
          {modalType === 'add-friend' && <AddFriendModal onClose={closeModal} />}
          {modalType === 'friend-requests' && <FriendRequestsModal onClose={closeModal} />}
          {modalType === 'profile-card' && (
            <ProfileCardModal onClose={closeModal} user={modalProps.user} />
          )}
        </div>
      </div>
    </div>
  );
}