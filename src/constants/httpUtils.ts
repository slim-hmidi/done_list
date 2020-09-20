const httpStatuscodes = {
  uniqueViolationError: 409,
};

const successMessages = {
  taskCreationSuccess: "Task created successfully",
  userCreationSuccess: "User created successfully",
  signInSuccess: "Successful signIn",
};
const errorMessages = {
  userExists: "User already exists",
  usernameRequired: "Username required",
  emailRequired: "Email required",
  emailNotValid: "Email not valid",
  firstNameRequired: "FirstName required",
  lastNameRequired: "LastName required",
  passwordRequired: "Password required",
  passwordLengthRequired: "Password must contains 8 characters",
  birthdayRequired: "Birthday required",
  dateFormatRequired: "Date should match the format yyyy-mm-dd",
  specialCharacterRequired: "Password must contain a special character",
  upperCaseCharacterRequired: "Password must contain an uppercase letter",
  lowerCaseCharacterRequired: "Password must contain a lowercase letter",
  numberRequired: "Password must contain a number",
  wrongPassword: "Wrong password",
  invalidUsername: "Wrong username",
  minLengthRequired: "Should contain at least 2 characters",
  titleRequired: "Title required",
  descriptionRequired: "Description Required",
  realisationDateRequired: "Realisation Date required",
  userIdRequired: "User id required",
  tagIdRequired: "Tag id required",
  invalidTagId: "No tag found for the given id",
  invalidUserId: "No user found for the given id",
};

export {
  httpStatuscodes,
  errorMessages,
  successMessages,
};
