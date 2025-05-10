/* eslint-disable @typescript-eslint/no-explicit-any */
export function handleAlertValidation(formRef: any) {
  const formElements = formRef.current?.elements;
  if(!formElements) return;
  for ( const element of formElements) {
    const { value } = element;
    const required = element.getAttribute('required');
    const isEmail = element.getAttribute('data-email');
    const username = element.getAttribute('data-username');
    const password = element.getAttribute('data-password');
    const type = element.getAttribute('type');
    if (type === "text" || type === "password") {
      if ( required !== null && value === "") {
        alert("Vui lòng nhập thông tin");
        return false;
      }
      if (isEmail !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)  && required !== null) {
        alert("Vui lòng nhập đúng định dạng email");
        return false;
      }
      if (username !== null && required !== null && !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/.test(value)) {
        alert("Vui lòng nhập đúng định dạng tên tài khoản");
        return false;
      }
      if (password !== null && required !== null && value.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự");
        return false;
      }
    }
  }
  return true;
}