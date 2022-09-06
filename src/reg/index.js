import { isEmail } from "../util.js";

const igroupEmail = document.querySelector('[data-igroup="email"]');
const igroupName = document.querySelector('[data-igroup="name"]');
const igroupSurname = document.querySelector('[data-igroup="surname"]');
const igroupPassword = document.querySelector('[data-igroup="password"]');
const igroupConfirm = document.querySelector('[data-igroup="confirm"]');
const regButton = document.querySelector('[data-action="reg"]');

main();

function main() {
  regButton.addEventListener("click", validate);
}

function validate() {
  let flag = true;
  //валидация имени
  const nameFormFloating = igroupName.querySelector(".form-floating");
  const nameInput = igroupName.querySelector("input");
  const name = nameInput.value.trim();

  nameFormFloating.classList.remove("is-invalid", "is-valid");
  nameInput.classList.remove("is-invalid", "is-valid");

  if (!name) {
    flag = false;
    nameFormFloating.classList.add("is-invalid");
    nameInput.classList.add("is-invalid");
  } else {
    nameFormFloating.classList.add("is-valid");
    nameInput.classList.add("is-valid");
  }
  //валидация имени

  //валидация фамилии
  const surnameFormFloating = igroupSurname.querySelector(".form-floating");
  const surnameInput = igroupSurname.querySelector("input");
  const surname = surnameInput.value.trim();

  surnameFormFloating.classList.remove("is-invalid", "is-valid");
  surnameInput.classList.remove("is-invalid", "is-valid");

  if (!surname) {
    flag = false;
    surnameFormFloating.classList.add("is-invalid");
    surnameInput.classList.add("is-invalid");
  } else {
    surnameFormFloating.classList.add("is-valid");
    surnameInput.classList.add("is-valid");
  }
  //валидация фамилии

  //валидация почты
  const emailFormFloating = igroupEmail.querySelector(".form-floating");
  const emailInput = igroupEmail.querySelector("input");
  const email = emailInput.value.trim();

  emailFormFloating.classList.remove("is-invalid", "is-valid");
  emailInput.classList.remove("is-invalid", "is-valid");

  if (!isEmail(email)) {
    flag = false;
    emailFormFloating.classList.add("is-invalid");
    emailInput.classList.add("is-invalid");
  } else {
    emailFormFloating.classList.add("is-valid");
    emailInput.classList.add("is-valid");
  }
  //валидация почты
  //валидация пороля
  const passwordFormFloating = igroupPassword.querySelector(".form-floating");
  const passwordInput = igroupPassword.querySelector("input");
  const password = passwordInput.value;

  passwordFormFloating.classList.remove("is-invalid", "is-valid");
  passwordInput.classList.remove("is-invalid", "is-valid");
  if (password.length < 3) {
    flag = false;
    passwordFormFloating.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
  } else {
    passwordFormFloating.classList.add("is-valid");
    passwordInput.classList.add("is-valid");
  }
  //валидация пороля
  //валидация подтверждения пороля
  const confirmPasswordFormFloating =
    igroupConfirm.querySelector(".form-floating");
  const confirmPasswordInput = igroupConfirm.querySelector("input");
  const confirmPassword = confirmPasswordInput.value;

  confirmPasswordFormFloating.classList.remove("is-invalid", "is-valid");
  confirmPasswordInput.classList.remove("is-invalid", "is-valid");

  if (password != confirmPassword || !confirmPassword) {
    flag = false;
    confirmPasswordFormFloating.classList.add("is-invalid");
    confirmPasswordInput.classList.add("is-invalid");
  } else {
    confirmPasswordFormFloating.classList.add("is-valid");
    confirmPasswordInput.classList.add("is-valid");
  }
  //валидация подтверждения пороля
  if (flag) {
    registration();
  }
}

async function registration() {
  //сброс классов группы имени
  const nameFormFloating = igroupName.querySelector(".form-floating");
  const nameInput = igroupName.querySelector("input");
  const name = nameInput.value.trim();

  nameFormFloating.classList.remove("is-invalid", "is-valid");
  nameInput.classList.remove("is-invalid", "is-valid");

  //сброс классов группы имени

  //сброс классов группы фамилии
  const surnameFormFloating = igroupSurname.querySelector(".form-floating");
  const surnameInput = igroupSurname.querySelector("input");
  const surname = surnameInput.value.trim();

  surnameFormFloating.classList.remove("is-invalid", "is-valid");
  surnameInput.classList.remove("is-invalid", "is-valid");

  //сброс классов группы фамилии

  //сброс классов группы почты
  const emailFormFloating = igroupEmail.querySelector(".form-floating");
  const emailInput = igroupEmail.querySelector("input");
  const email = emailInput.value.trim();

  emailFormFloating.classList.remove("is-invalid", "is-valid");
  emailInput.classList.remove("is-invalid", "is-valid");

  //сброс классов группы почты
  //сброс классов группы пороля
  const passwordFormFloating = igroupPassword.querySelector(".form-floating");
  const passwordInput = igroupPassword.querySelector("input");
  const password = passwordInput.value;
  passwordInput.value = "";

  passwordFormFloating.classList.remove("is-invalid", "is-valid");
  passwordInput.classList.remove("is-invalid", "is-valid");

  //сброс классов группы пороля
  //сброс классов группы подтверждения пороля
  const confirmPasswordFormFloating =
    igroupConfirm.querySelector(".form-floating");
  const confirmPasswordInput = igroupConfirm.querySelector("input");
  confirmPasswordInput.value = "";

  confirmPasswordFormFloating.classList.remove("is-invalid", "is-valid");
  confirmPasswordInput.classList.remove("is-invalid", "is-valid");
  try {
    const response = await fetch("/api/reg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, surname, password }),
    });
    if (response.ok) {
      alert("регистрация успешна");
      //   location.href = "/index.html";
    }
    const text = await response.text();
    throw Error(text);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
