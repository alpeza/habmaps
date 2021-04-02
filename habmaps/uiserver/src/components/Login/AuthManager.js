class AuthManager {
  constructor() {
    this.logging_path = '/authen/login'
    this.validate_path = '/authen/validate'
    this.token=''
  }

  async checkUser(ruser,rpassword){
    /*Se emplea para iniciar una sesion*/
    //1.- Validamos el usuario y el password
    const resp = await this.postData(this.logging_path , { user: ruser, password: rpassword })
    if( resp.login ){
      this.token = resp.token;
      localStorage.setItem('token', this.token)
    }
    return resp;
  };

  isLogged(){
    const sfetch = require('sync-fetch')
    var utoken = localStorage.getItem('token')
    if (utoken) {
      const resp = sfetch(this.validate_path, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ token: utoken }),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/vnd.citationstyles.csl+json'
        }
      }).json()
      return resp.isValid
    }else{
      //console.log('No hay token')
      return false;
    }
  }

  //*** Private ***
  async  postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  };

}

export default AuthManager;
