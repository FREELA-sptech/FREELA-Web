export function isValidCPF(cpf: string): boolean{
    cpf = cpf.replace(/[^\d]/g, ''); // Remove tudo que não é número
    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos
    else if (cpf == "00000000000") return false;
    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;
  
    if (parseInt(cpf.charAt(9)) !== digit) return false;
  
    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    digit = remainder < 2 ? 0 : 11 - remainder;
  
    return parseInt(cpf.charAt(10)) === digit;
  }

  export function notBlank(field: string){
    return !field || field === "";
  }

  export function emailValidation(email : string){
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  export function passwordValidation(password : string){
    return password.length < 8
  }