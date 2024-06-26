function signUpUser(firstName, lastName) {
    return new Promise((resolve, reject) => {
      const user = {
        firstName: firstName,
        lastName: lastName,
      };
      resolve(user);
    });
  }