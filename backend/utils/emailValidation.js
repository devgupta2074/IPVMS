export const emailValidation = (email) => {
  const check = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  if (!check.test(email)) {
    return { error: "Invalid Email format", success: false };
  }
  const index = email.indexOf("@");
  const domain = email.slice(index + 1);
  if (domain !== "ex2india.com") {
    return { error: "Invalid Domain", success: false };
  }
  return { success: true };
};
