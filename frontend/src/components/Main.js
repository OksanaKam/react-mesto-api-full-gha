import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, 
               onEditAvatar, 
               onEditProfile, 
               onAddPlace, 
               onCardClick, 
               onCardLike, 
               onCardDelete
              }) {
  const currentUser = useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-group" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Фото профиля" src={currentUser.avatar} />
            <button className="profile__avatar-button" type="button" id="avatar-button" aria-label="Изменить" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" id="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
        </section>
        <section>
          <ul className="elements">
            {cards.map((card) => {
              return(
                <Card card={card} 
                      key={card._id} 
                      onCardClick={onCardClick} 
                      onCardLike={onCardLike} 
                      onCardDelete={onCardDelete} />
              );
            })}
          </ul>
        </section>
      </main>
    );

}

export default Main;