export function validateRequired(fields: any, body: any) {
  return new Promise((resolve, reject) => {
    fields.forEach((element: any, index: number) => {
      if (
        body[fields[index][0]] === "" ||
        body[fields[index][0]] === " " ||
        body[fields[index][0]]?.length === 0 ||
        ((typeof body[fields[index][0]] === "string" ||
          body[fields[index][0]] instanceof String) &&
          !body[fields[index][0]].replace(/\s/g, "").length)
      ) {
        reject({
          message: `${fields[index][1]} must not contain only white spaces`,
        });
      }
    });
    resolve(true);
  });
}

export function validatePasswordMatch(password: string, confirmPassword: any) {
  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      reject({
        message: `Password does not match`,
      });
    } else if (password.length < 8 || password.length > 20) {
      reject({ message: "Enter a password in between 8 to 20 characters" });
    } else {
      resolve(true);
    }
  });
}

export function validateLength(fields: any, body: any, minLength: number) {
  return new Promise((resolve, reject) => {
    fields.forEach((element: any, index: number) => {
      if (body[fields[index][0]].length < minLength) {
        reject({
          message: ` Length of ${fields[index][1]} must be greater than or equal to ${minLength}`,
        });
      }
    });
    resolve(true);
  });
}
