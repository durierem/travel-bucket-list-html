/**
 * A collection of common scripts troughout pages.
 */

export class Common {
  static load () {
    handleModalClosing()
  }
}

const handleModalClosing = () => {
  document.querySelectorAll('.modal').forEach((modal) => {
    const closeButton = modal.querySelector('button.modal-close')
    closeButton.addEventListener('click', () => {
      modal.classList.remove('is-active')
    })
  })
}

