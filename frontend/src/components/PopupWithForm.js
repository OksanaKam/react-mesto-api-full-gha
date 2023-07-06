import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function PopupWithForm({name, title, isOpen, onClose, button, children, onSubmit, isValid}) {
    usePopupClose(isOpen, onClose);
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__modal">
                <button className="popup__close" type="button" onClick={onClose} aria-label="Закрыть"></button>
                <form className="popup__container popup__form" 
                      name={name} 
                      onSubmit={onSubmit}  
                      method="post"
                      noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className={`popup__button ${ !isValid && 'popup__button_disabled' }`}
                            type="submit" 
                            aria-label="Сохранить"
                            disabled={!isValid}>{button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
