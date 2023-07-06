import success from '../images/Union-success.png';
import unsuccess from '../images/Union-unsuccess.png';
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({isOpen, onClose, isSuccess}) {
    const infoTooltipTitle = {
        successTitle: 'Вы успешно зарегистрировались!',
        unsuccessTitle: 'Что-то пошло не так! Попробуйте ещё раз.'
    };

    usePopupClose(isOpen,onClose);

    return(
        <div className={`popup popup_type_logged ${isOpen && 'popup_opened'}`}>
            <div className="popup__modal">
                <button className="popup__close" 
                        type="button" aria-label="Закрыть" 
                        onClick={onClose}></button>
                <div className="popup__container popup__form" 
                      id="popup__container-logged" 
                      name="logged" method="post">
                   <img className="popup__logged-image" 
                        src={isSuccess ? success : unsuccess} 
                        alt={isSuccess ? infoTooltipTitle.successTitle : infoTooltipTitle.unsuccessTitle} />
                    <h2 className="popup__logged-title">{isSuccess ? infoTooltipTitle.successTitle : infoTooltipTitle.unsuccessTitle}</h2>
                </div>
            </div>
        </div>
    )

}

export default InfoTooltip;