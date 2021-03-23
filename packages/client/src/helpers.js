export const convertTo64 = (file, callback) => {
  const fileReader = new FileReader()
  fileReader.onload = () => callback(fileReader.result)
  fileReader.readAsDataURL(file)
}

export const decode64 = string => window.atob(string)

export const isAdmin = token => {
  const payloadEncoded = token.split('.')[1]
  let payloadDecoded = this.decode64(payloadEncoded)
  payloadDecoded = JSON.parse(payloadDecoded)
  if (payloadDecoded.userGroup === 'admin') return true
  return false
}
