import { useModal } from '../../context/ModalContext';
import CloseButton from '../CloseButton';
import AddFriendModal from './AddFriendModal';
import FriendRequestsModal from './FriendRequestsModal';
import ProfileCardModal from './ProfileCardModal';
import ConfirmModal from './ConfirmModal';

export default function Modal() {
  const { modals, closeModal } = useModal();

  if(!modals.length) return null;

  return (
    <>
      {modals.map(({ type, props }, index) => {
        const zIndex = 50 + index * 10;

        return (
          <div
            key={index}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 animate-in fade-in duration-200"
            style={{ zIndex }}
            onClick={() => closeModal()}
          >
            <div
              className="bg-slate-800 backdrop-blur-lg rounded-2xl p-8 shadow-2xl min-w-[24rem] mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal} />
              <div className="mt-0">
                {type === 'add-friend' && <AddFriendModal onClose={closeModal} />}
                {type === 'friend-requests' && <FriendRequestsModal onClose={closeModal} />}
                {type === 'profile-card' && (
                  <ProfileCardModal onClose={closeModal} user={props.user} />
                )}
                {type === 'confirm' && (
                  <ConfirmModal {...props} onCancel={closeModal} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
