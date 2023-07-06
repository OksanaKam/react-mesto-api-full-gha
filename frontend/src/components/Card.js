import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardTrashButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_active' : ''}`
  )

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__title-group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="Нравится"></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button className={cardTrashButtonClassName} type="button" onClick={handleDeleteClick} aria-label="Удалить"></button>
    </li>
  );
}

export default Card;