export const calculateAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);

  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  return age;
};
