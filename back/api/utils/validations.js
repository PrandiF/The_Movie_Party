const regexPatterns = {
  id: /^\d+$/,
  dni: /^\d{8}$/,
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  lastname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  fantasyName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s,-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d+$/,
  address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  imageFormat: /\.(jpeg|jpg|png|gif)$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,  
};

const validate = {
  id: id => regexPatterns.id.test(id),
  dni: dni => regexPatterns.dni.test(dni),
  name: name => regexPatterns.name.test(name),
  lastname: lastname => regexPatterns.name.test(lastname),
  fantasyName: name => regexPatterns.fantasyName.test(name),
  email: email => regexPatterns.email.test(email),
  phone: number => !isNaN(number) && regexPatterns.phone.test(number),
  imageFormat: photo => regexPatterns.imageFormat.test(photo),
  password: password => regexPatterns.password.test(password),
};
module.exports = validate;