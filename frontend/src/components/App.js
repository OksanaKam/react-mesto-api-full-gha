import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSucceed, setSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function checkToken() {
      const token = localStorage.getItem('jwt');
      if (token) {
        auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            navigate('/', {replace: true})
          }
        })
        .catch(console.error);
      }
  }

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([profileUser, cardsArray]) => {
        setCurrentUser(profileUser);
        setCards(cardsArray.reverse());
      })
      .catch(console.error);
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => 
        state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
    } else {
      api.removeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
        state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => 
      state.filter((c) => c._id !== card._id));
    })
    .catch(console.error);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userData) {
    function makeRequest() {
      return api.postUserInfo(userData).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(userData) {
    function makeRequest() {
      return api.changeAvatar(userData).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleRegister(email, password) {
    auth.register(email, password)
    .then(() => {
      setSucceed(true);
      handleInfoTooltipClick();
      navigate('/signin', {replace: true});
    })
    .catch(err => {
      console.log(err)
      setSucceed(false);
      handleInfoTooltipClick();
    });
  }

  function handleLogin(email, password) {
    auth.login(email, password)
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(email);
        setSucceed(true);
        navigate('/');
      }
    })
    .catch((err) => {
      console.log(err);
      //setLoggedIn(false);
      setSucceed(false);
      handleInfoTooltipClick();
    });
  }

  function handleSignout() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <AppContext.Provider value={{isLoading, closeAllPopups}}>
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} 
                isLoggedIn={isLoggedIn} 
                handleSignout={handleSignout} />
        <Routes>
          <Route path='/' 
                 element={
                 <ProtectedRouteElement element={Main} 
                                        isLoggedIn={isLoggedIn} 
                                        cards={cards} 
                                        onEditProfile={handleEditProfileClick} 
                                        onAddPlace={handleAddPlaceClick} 
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete} />} />
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
          <Route path='*' element={isLoggedIn ? 
                                  <Navigate to={'/'} replace /> : 
                                  <Navigate to={'/signin'} replace /> } />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} 
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen}
                     onClose={closeAllPopups}
                     isSuccess={isSucceed} />
      </div>
    </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
