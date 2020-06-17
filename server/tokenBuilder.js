//@ts-nocheck
const TOKEN = "123456789_"

export const getToken = (object) => {
  return TOKEN + JSON.stringify(object);
}