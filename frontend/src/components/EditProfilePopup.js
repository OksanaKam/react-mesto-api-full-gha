import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = useContext(CurrentUserContext);

    const {formValue, handleChange, setFormValue, errors, isValid, resetForm} = useForm({});

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
        setFormValue({
            name: currentUser.name,
            about: currentUser.about
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: formValue.name,
            about: formValue.about
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" 
                       name="type_profile" 
                       button={isLoading ? 'Сохранение...' : 'Сохранить'} 
                       isOpen={isOpen} 
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isValid={isValid}>
            <input className={`popup__input popup__input_name_title ${ errors.name && 'popup__input_invalid' }`}
                   id="title-input" type="text" 
                   name="name" 
                   value={formValue.name || ''}
                   onChange={handleChange} 
                   placeholder="name" 
                   minLength="2" 
                   maxLength="40" 
                   required />
            <span className={`popup__input-error title-input-error ${ isValid ? '' : 'popup__error_visible' }`}>{errors.name}</span>
            <input className={`popup__input popup__input_name_yourself ${ errors.about && 'popup__input_invalid' }`}
                   id="yourself-input" type="text" 
                   name="about" 
                   value={formValue.about || ''}
                   onChange={handleChange} 
                   placeholder="yourself" 
                   minLength="2" 
                   maxLength="200" 
                   required />
            <span className={`popup__input-error yourself-input-error ${ isValid ? '' : 'popup__error_visible' }`}>{errors.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;