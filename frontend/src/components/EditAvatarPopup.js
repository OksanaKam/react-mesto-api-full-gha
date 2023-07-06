import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = useRef();

    const {handleChange, setFormValue, errors, isValid, resetForm} = useForm();

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
        avatarRef.current.value = '';
        setFormValue({avatar: ''})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return(
        <PopupWithForm title="Обновить аватар" 
                       name="type_avatar-edit" 
                       button={isLoading ? 'Сохранение...' : 'Создать'} 
                       isOpen={isOpen} 
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isValid={isValid}>
          <input className={`popup__input popup__input_name_avatar ${ errors.avatar && 'popup__input_invalid' }`}
                 id="avatar-input" 
                 type="url" 
                 name="avatar"
                 ref={avatarRef} 
                 placeholder=""
                 onChange={handleChange} 
                 required />
          <span className={`popup__input-error avatar-input-error ${ isValid ? '' : 'popup__error_visible' }`}>{errors.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;