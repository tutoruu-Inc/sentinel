import { RESTDataSource, WillSendRequestOptions } from '@apollo/datasource-rest';

class FeedAPI extends RESTDataSource {
  override baseURL = 'https://feed-dev-4arkn.ondigitalocean.app/api/';
  private token: string;

  constructor(options: { token: string }) {
    super();
    this.token = options.token;
  }
  
  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['authorization'] = 'Bearer ' + this.token;
  }
  
}