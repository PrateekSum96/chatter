import "./validate.css";

export const validateData = (email, password) => {
  const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidEmail) {
    return "Email is not valid!";
  }
  if (!isPasswordValid) {
    return (
      <div className="validate-msg">
        <h3>Password must contain:</h3>
        <li>At least 8 characters.</li>
        <li>One number.</li>
        <li>One Uppercase letter.</li>
        <li>One Lowercase letter.</li>
      </div>
    );
  }
  return null;
};
