import { RESTDataSource, WillSendRequestOptions } from '@apollo/datasource-rest';
import { AuthPayload, RegisterUserInput, Resolvers } from '../../generated/types';

class AAuthAPI extends RESTDataSource {
  override baseURL = 'https://feed-dev-4arkn.ondigitalocean.app/api/';
  private token: string;

  constructor(options: { token: string }) {
    super();
    this.token = options.token;
  }
  
  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['authorization'] = 'Bearer ' + this.token;
  }
  
  async login(email: string, password: string) {
    const { data, code } = await this.post<AuthPayload>('login', { body: { email, password }});
    console.log({ data, code })
    this.token = data?.token ?? "";
    return { data };
  }

  async signup(input: RegisterUserInput) {
    const { data, code } = await this.post<AuthPayload>('register', { body: input });
    this.token = data?.token ?? "";
    return { data };
  }

  async verifyEmail(token: string) {
    const { data, code } = await this.post<AuthPayload>('VerifyEmail', { body: { token } });
    
    if (!code || code < 400) {
      this.token = data?.token ?? "";
      return true;
    }
    return false;
  }
}

export const AuthAPI = new AAuthAPI({ token: '' });

export const authResolvers: Resolvers = {
  Mutation: {
    login: async (_, args) => await AuthAPI.login(args.email, args.password),
    signup: async (_, args) => await AuthAPI.signup(args.input as RegisterUserInput),
    verifyEmail: async (_, args) => await AuthAPI.verifyEmail(args.token),
  },
};
