const buttonSearch = document.querySelector('#page-home main a');
const closeModal = document.querySelector('#modal .header a');
const modal = document.querySelector('#modal');

buttonSearch.addEventListener('click', () => {
    modal.classList.toggle('hide');
})

closeModal.addEventListener('click', () => {
    modal.classList.toggle('hide');
})