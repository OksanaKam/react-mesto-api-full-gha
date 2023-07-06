import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({card, onClose}) {
    usePopupClose(card?.link, onClose)
    return(
        <div className={`popup popup_type_picture ${card && 'popup_opened'}`}>
            <div className="popup__modal-img">
                <button className="popup__close" 
                        type="button" aria-label="Закрыть" 
                        onClick={onClose}></button>
                <div className="popup__container-img popup__form" id="popup__container-img" name="myPhotos" method="post">
                   <img className="popup__place-image" 
                        src={card?.link} 
                        alt={card?.name} />
                    <h2 className="popup__place-title">{card?.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;