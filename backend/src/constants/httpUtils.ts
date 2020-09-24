const httpStatuscodes = {
  uniqueViolationError: 409,
};

const successMessages = {
  taskCreationSuccess: "Task created successfully",
  taskDeletionSuccess: "Task deleted successfully",
  taskFetchSuccess: "Task(s) fetched successfully",
  taskUpdateSuccess: "Task updated successfully",
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
  invalidTaskId: "No task found for the given id",
  invalidUserId: "No user found for the given id",
  taskNotBelongsToUser: "Given task does not belongs to the given user",
  updateUserTaskNotAllowed: "Not allowed to update the task's owner",
  updateUserNotAllowed: "Not allowed to update the user while updating a task",
  tokenRequired: "Token required",
  tokenNotValid: "Token not valid",
};

export {
  httpStatuscodes,
  errorMessages,
  successMessages,
};
