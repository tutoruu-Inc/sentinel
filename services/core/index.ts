import { RESTDataSource } from "@apollo/datasource-rest";
import { University, User, Class, Course, Tutor, CreateUserInput, UpdateUserInput } from "../../generated/types";

export * from "./course.js";
export * from "./user.js";
export * from "./class.js";
export * from "./university.js";
export * from "./tutor.js";

class CCoreAPI extends RESTDataSource {
  override baseURL = "https://core-dev-8pwnv.ondigitalocean.app/api2/api/";

  async getUser({
    _id,
    email,
    username,
  }: {
    _id: string;
    email: string;
    username: string;
  }): Promise<User> {
    if (email)
      return (await this.get<{ user: User }>("user/email/" + email)).user;
    if (username)
      return (await this.get<{ user: User }>("user/username/" + username)).user;
    return this.get<User>("user/" + _id);
  }
  async getTutor({
    _id,
    username,
  }: {
    _id: string;
    username: string;
  }): Promise<Tutor> {
    if (username) return await this.get<Tutor>("tutor/username/" + username);
    return this.get<Tutor>("tutor/" + _id);
  }
  async getTutors(): Promise<Tutor[]> {
    return (await this.get<{ tutors: Tutor[] }>("tutor")).tutors;
  }
  async getUsers(): Promise<User[]> {
    const { users } = await this.get<{ users: User[] }>("user");
    return users;
  }
  async getUniversity(id: string): Promise<University> {
    const { university } = await this.get<{ university: University }>(
      "university/" + id
    );
    return university;
  }
  async getUniversities(): Promise<University[]> {
    return await this.get<University[]>("university");
  }
  async getClass(id: string): Promise<Class> {
    const { one_class } = await this.get<{ one_class: Class }>("class/" + id);
    return one_class;
  }
  async getClasses(): Promise<Class[]> {
    const { classes } = await this.get<{ classes: Class[] }>("class");
    return classes;
  }
  async getCourse(id: string): Promise<Course> {
    return await this.get<Course>("course/" + id);
  }
  async getCourses(): Promise<Course[]> {
    const { courses } = await this.get<{ courses: Course[] }>("course");
    return courses;
  }
  async createUser(user: CreateUserInput): Promise<User> {
    return this.post<User>("user", { body: user });
  }
  async updateUser(id: string, user: UpdateUserInput): Promise<User> {
    return this.patch<User>(`user/${id}/fields`, { body: { fields: user }});
  }
  async deleteUser(id: string): Promise<User> {
    return this.delete<User>(`user/${id}`);
  }
}

export const CoreAPI = new CCoreAPI();
