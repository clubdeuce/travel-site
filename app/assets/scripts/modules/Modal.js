import $ from 'jquery';

export default class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');

    this.events();
  }

  openModal() {
    this.modal.addClass('modal--is-visible');
    return false;
  }

  closeModal() {
    this.modal.removeClass('modal--is-visible');
    return false;
  }

  events() {
    //Click the open button
    this.openModalButton.click(this.openModal.bind(this));

    //Click the close button
    this.closeModalButton.click(this.closeModal.bind(this));

    //User presses any key
    $(document).keyup(this.keyPressHandler.bind(this));

  }

  keyPressHandler(e) {
    if ( 27 === e.keyCode ) {
      this.closeModal();
    }
  }
}