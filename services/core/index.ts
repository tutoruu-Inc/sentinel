import { RESTDataSource } from "@apollo/datasource-rest";
import { User } from "../../generated/types";

class CCoreAPI extends RESTDataSource {
  override baseURL = "https://api.tutoruu.com/api/";

  async getUser(id: string): Promise<User> {
    return this.get<User>(`user/${encodeURIComponent(id)}`);
  }
  async getUsers(): Promise<User[]> {
    const { users } = await this.get<{ users: User[] }>("user");
    return users;
  }
}

export const CoreAPI = new CCoreAPI();
