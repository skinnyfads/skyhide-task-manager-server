function encrypt(text: string, secret: string) {
  const textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: number[]) => textToChars(secret).reduce((a, b) => a ^ b, code[0]);

  return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
}
function decrypt(encoded: string, secret: string) {
  const textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: number) => textToChars(secret).reduce((a, b) => a ^ b, code);

  return encoded
    .match(/.{1,2}/g)!
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
}

const skinnyCrypt = { encrypt, decrypt };

export default skinnyCrypt;
