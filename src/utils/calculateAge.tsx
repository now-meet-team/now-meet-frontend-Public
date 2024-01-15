export const calculateAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);

  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  //   if (
  //     currentDate.getMonth() < birthDate.getMonth() ||
  //     (currentDate.getMonth() === birthDate.getMonth() &&
  //       currentDate.getDate() < birthDate.getDate())
  //   ) {
  //     age--;
  //   }

  return age;
};
