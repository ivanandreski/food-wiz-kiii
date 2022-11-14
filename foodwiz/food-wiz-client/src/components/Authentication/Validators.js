import validator from "validator";

const Validators = {
  signUpValid: (email, password, confirmPassword, fullName) => {
    if (!validator.isEmail(email))
      return {
        valid: false,
        message: "Email invalid",
      };
  },

  emailValid: (email) => {
    if (!validator.isEmail(email))
      return {
        valid: false,
        message: "Email invalid",
      };

    return { valid: true };
  },

  passwordValid: (password, confirmPassword) => {
    if (password === "" || confirmPassword === "")
      return {
        valid: false,
        message: "Password cannot be empty",
      };
    if (password !== confirmPassword)
      return {
        valid: false,
        message: "Passwords do not match!",
      };

    return { valid: true };
  },
};

export default Validators;
