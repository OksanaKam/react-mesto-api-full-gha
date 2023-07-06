import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const {formValue, handleChange, setFormValue, errors, isValid, resetForm} = useForm();

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
        setFormValue({
            name: '',
            link: ''
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: formValue.name,
            link: formValue.link
        });
    }

    return(
        <PopupWithForm title="Новое место" 
                       name="type_card-add" 
                       button={isLoading ? 'Сохранение...' : 'Создать'}
                       isOpen={isOpen} 
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isValid={isValid}>
          <input className={`popup__input popup__input_name_place ${ errors.name && 'popup__input_invalid' }`} 
                 id="place-input" type="text" 
                 name="name" 
                 placeholder="Название" 
                 minLength="2" 
                 maxLength="30"
                 value={formValue.name || ''}
                 onChange={handleChange}
                 required />
          <span className={`popup__input-error place-input-error ${ isValid ? '' : 'popup__error_visible' }`}>{errors.name}</span>
          <input className={`popup__input popup__input_name_reference ${ errors.link && 'popup__input_invalid' }`} 
                 id="reference-input" type="url" 
                 name="link"
                 placeholder="Ссылка на картинку" 
                 value={formValue.link || ''}
                 onChange={handleChange}
                 required />
          <span className={`popup__input-error reference-input-error ${ isValid ? '' : 'popup__error_visible' }`}>{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;