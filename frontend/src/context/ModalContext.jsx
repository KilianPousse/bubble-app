import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modals, setModals] = useState([]);

    const openModal = (type, props = {}) => {
        setModals((prev) => [...prev, { type, props }]);
    };

    const closeModal = () => {
        setModals((prev) => prev.slice(0, -1));
    };

    const closeAllModals = () => {
        setModals([]);
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
