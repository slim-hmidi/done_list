const httpStatuscodes = {
  uniqueViolationError: 409,
};

const successMessages = {
  userCreated: "User created successfully",
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
  birthdayFormatRequired: "Birthday should match the format yyyy-mm-dd",
  specialCharacterRequired: "Password must contain a special character",
  upperCaseCharacterRequired: "password must contain an uppercase letter",
  lowerCaseCharacterRequired: "password must contain a lowercase letter",
  numberRequired: "password must contain a number",
};

export {
  httpStatuscodes,
  errorMessages,
  successMessages,
};
