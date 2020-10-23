const helpers = {

  convertTo64: function(file, callback) {
    const fileReader = new FileReader();
    fileReader.onload = () => callback(fileReader.result);
    fileReader.readAsDataURL(file);
  },

  decode64: function(string) {
    return window.atob(string);
  },

  isAdmin: function(token) {
    const payloadEncoded = token.split('.')[1];
    let payloadDecoded = this.decode64(payloadEncoded);
    payloadDecoded = JSON.parse(payloadDecoded);
    if (payloadDecoded.user_group === 'admin') return true;
    return false;
  }



}

export default helpers;
