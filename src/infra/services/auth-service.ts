import http from './http-service';

class AuthService {
  static async login(username: string, password: string) {
    return await http.post('/auth/login', {username, password});
  }
}

export default AuthService;
