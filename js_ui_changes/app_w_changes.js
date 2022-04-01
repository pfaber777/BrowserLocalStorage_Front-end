
const addMovieModal = document.getElementById('add-modal'); // dialogue box for inputs
const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');
const addMovieButton = addMovieModal.querySelector('.btn--passive');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');



const movies = [];

// UI
const updateUI = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearInputs = () => {
    for(const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearInputs();
};

// Handles user inputs
const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if( titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid Values(rating between 1 and 5)');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };


    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    clearInputs();
    toggleBackdrop();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
    
};

// handles editing inputs
const editMovieHandler = () => {
    const editedTitle = userInputs[0].value; // edit
    const editedImageUrl = userInputs[1].value; // edit
    const editedRating = userInputs[2].value; // edit

    if( editedTitle.trim() === '' ||
        editedImageUrl.trim() === '' ||
        editedRating.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid Values(rating between 1 and 5)');
        return;
    }
    const replacedMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies[newMovie].replaceWith(replacedMovie);
    console.log(movies);
    closeMovieModal();
    clearInputs();
    toggleBackdrop();
    renderNewMovieElement(
        replacedMovie.id,
        replacedMovie.title,
        replacedMovie.image,
        replacedMovie.rating
    );

    
    updateUI();
    
};


const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for(const movie of movies) {
        if(movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};



// Handles deletion confirmation dialogue box
const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive'); 
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal); // abort deletion btn
    cancelDeletionButton,removeEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId)); // confirm deletion btn
};


// renders Movie template with plugged in input
const renderNewMovieElement = (id, title, imageUrl, rating) => {
    


     
    newMovieElement = newMovieElement.createElement('button');
    newMovieElement.button.classList.add('editButton');
    if(newMovieElement.button.clicked = true) {
        newMovieElement.innerHTML = `
    <div class="movie-element__info">
        <input type="text" name="title" id="title"/>
        <input type="number" step="1" max="5" min="1" name="rating" id="rating"<p>/5 Stars</p>
        <button id="edit">Edit</button>
    </div>`;
    } else {
        const newMovieElement = document.createElement('li');
        newMovieElement.className = 'movie-element';
        newMovieElement.innerHTML = `
        <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 Stars</p>
            <button id="edit">Edit</button>
        </div>
    `;
    }

    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id)); // opens delete confirm dialogue upon Movie UI click
    const listRoot = document.getElementById('movie-list'); // assigns full movie list to variable
    listRoot.append(newMovieElement); // adds new movie to UI movie list
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearInputs();
};


startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

