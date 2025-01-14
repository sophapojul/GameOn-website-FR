// eslint-disable-next-line import/extensions
import { setErrMsg, delErrMsg } from './message.js';
/**
 * It returns true if the value of the element is not empty, and false otherwise
 * @param {HTMLInputElement} elt - The element to check.
 * @returns {Boolean} A boolean value.
 */
function notEmpty(elt) {
  const el = elt;
  // const dataLength = el.value.trim().length;
  //   switch (el.getAttribute('type')) {
  //     case 'text':
  //     case 'email':
  //     case 'number':
  //     case 'date':
  return !!el.value.trim().length;
  //     default:
  //       return true;
  //   }
}
/**
 * It takes a DOM element and a regular expression as arguments, and returns true if the element's
 * value matches the regular expression
 * @param {HTMLInputElement} el - The element that you want to test.
 * @param {RegExp} regExp - The regular expression to test against.
 * @returns {Boolean} A boolean value.
 */
function testRegExp(el, regExp) {
  const testedValue = regExp.test(el.value.trim());
  return !!testedValue;
}
/**
 * It checks if a radio button is selected, and if not, it displays an error message
 */
// eslint-disable-next-line consistent-return
function radioSelected() {
  /** @const {HTMLInputElement} radio */
  const radio = document.querySelector('input[type="radio"]');
  /** @const {HTMLInputElement} selected */
  const selected = document.querySelector('input[name="location"]:checked');
  if (arguments.length === 0) {
    if (selected) {
      // @ts-ignore
      delErrMsg(selected);
    } else {
      // @ts-ignore
      setErrMsg(radio, 'Vous devez choisir une ville.');
    }
    return !!selected;
  }
  return !!selected;
}
/**
 * It checks if the checkbox is checked, if not, it displays an error message, if it is, it removes the
 * error message
 * @returns {Boolean} A boolean value.
 */
function cguChecked() {
  /**
   *@const cgu - an input type checkbox
   *@type  {HTMLInputElement}
   */
  const cgu = document.querySelector('#checkbox1');
  if (cgu) {
    delErrMsg(cgu);
  }
  setErrMsg(
    cgu,
    "Vous devez avoir lu et accepté les conditions d'utilisation."
  );
  return !!cgu.checked;
}

/**
 * It checks if the input is valid, and if it is, it returns true, otherwise it returns false
 * @param {HTMLInputElement} elt - the element to be validated
 * @returns {Boolean} A boolean value.
 */
export function valid(elt) {
  /**
   *
   *@const
   *@type {HTMLInputElement}
   */
  const el = elt;
  const dataSet = el.parentElement.dataset;
  if (!notEmpty(el)) {
    const msg = `Vous devez remplir le champ " ${el.previousElementSibling.textContent} "`;
    setErrMsg(el, msg);
    return false;
  }
  dataSet.errorVisible = 'false';
  switch (el.type) {
    case 'text': {
      const textRegExp =
        /^(?=.{2,30}$)[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+(?:['\s-][A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+)*$/iu;
      const textErrMsg =
        "Le champ doit contenir au moins 2 caractères alphabétiques et si besoin un trait d'union - ou une apostrophe ' ou un espace suivi d'une lettre .";
      if (testRegExp(el, textRegExp)) {
        delErrMsg(el);
        return true;
      }
      setErrMsg(el, textErrMsg);
      return false;
    }
    case 'email': {
      const emailRegExp =
        /^(?=.{2,40}$)[\w\d]+([.-]?[\w\d])*[@]{1}[\w\d]+([.-]?[\w\d]+)*[.]{1}[a-zA-Z]{2,3}$/i;
      const emailErrMsg = 'Le champ doit contenir une adresse mail valide.';
      if (testRegExp(el, emailRegExp)) {
        delErrMsg(el);
        return true;
      }
      setErrMsg(el, emailErrMsg);
      return false;
    }
    case 'date': {
      const age = new Date().getFullYear() - new Date(el.value).getFullYear();
      const dateErrMsg =
        'Le champ doit contenir une date valide et vous devez avoir 12 ans.';
      if (
        new Date(el.value).toString() === 'Invalid Date' ||
        new Date(el.value).getFullYear() < 1900 ||
        age < 12
      ) {
        setErrMsg(el, dateErrMsg);
        return false;
      }
      delErrMsg(el);
      return true;
    }
    case 'number': {
      const numberRegExp = /^\d{1,2}$/; // /^(0?\d|[1-9]\d)$/
      const numberErrMsg =
        'Vous devez saisir un nombre entier positif inférieur à 100.';
      if (testRegExp(el, numberRegExp)) {
        delErrMsg(el);
        return true;
      }
      setErrMsg(el, numberErrMsg);
      return false;
    }
    case 'checkbox': {
      const cguErrMsg =
        "Vous devez avoir lu et accepté les conditions d'utilisation.";
      if (el.checked) {
        delErrMsg(el);
        return true;
      }
      setErrMsg(el, cguErrMsg);
      return false;
    }
    case 'radio': {
      const radiosErrMsg = 'Vous devez choisir une ville.';
      if (radioSelected()) {
        delErrMsg(el);
        return true;
      }
      setErrMsg(el, radiosErrMsg);
      el.parentElement.style.border = '1px solid red';
      return false;
    }
    default:
      return true;
  }
}

/**
 * If the first name field is not empty, then validate it
 * @returns  {Boolean} The function firstValid() is being returned.
 */
function firstValid() {
  return valid(document.querySelector('#first'));
}
/**
 * If the last name is not empty, then validate it
 * @returns  {Boolean} The function lastValid() is being returned.
 */
function lastValid() {
  return valid(document.querySelector('#last'));
}
/**
 * If the email field is not empty, then validate it
 * @returns  {Boolean} a boolean value.
 */
function emailValid() {
  return valid(document.querySelector('#email'));
}
/**
 * It checks if the birthdate input is not empty, and if it's not, it checks if the date is valid. If
 * it is, it checks if the date is in the correct format
 * @returns  {Boolean} A boolean value.
 */
function birthdateValid() {
  return valid(document.querySelector('#birthdate'));
}
/**
 * If the quantity field is not empty, then validate it using the regular expression.
 * @returns  {Boolean} the value of the function valid.
 */
function quantityValid() {
  return valid(document.querySelector('#quantity'));
}
/**
 * It returns true if all the other functions return true
 * @returns {Boolean} A boolean value.
 */
export function validate() {
  const validated = !!(
    firstValid() &&
    lastValid() &&
    emailValid() &&
    birthdateValid() &&
    quantityValid() &&
    radioSelected() &&
    cguChecked()
  );
  return validated;
}
