import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Class = {
  __typename?: 'Class';
  _id: Scalars['String'];
  courses: Array<Course>;
  desc: Scalars['String'];
  name: Scalars['String'];
  students: Array<User>;
  university: University;
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['String'];
  class: Class;
  desc?: Maybe<Scalars['String']>;
  grade: Scalars['String'];
  professor: Scalars['String'];
  rating: Scalars['Float'];
  reviews: Array<Review>;
  sessions: Array<Session>;
  students: Array<User>;
  tutor: Array<Tutor>;
};

export type CreateApplicationCourseInput = {
  course: TutorApplicationCourseInput;
};

export type CreateClassInput = {
  desc: Scalars['String'];
  name: Scalars['String'];
};

export type CreateCourseInput = {
  desc?: InputMaybe<Scalars['String']>;
  grade: Scalars['String'];
  one_class: Scalars['String'];
  professor: Scalars['String'];
};

export type CreateReviewInput = {
  course_id: Scalars['String'];
  text: Scalars['String'];
};

export type CreateSessionInput = {
  additional_info?: InputMaybe<Scalars['String']>;
  course: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  student: Scalars['String'];
  topic?: InputMaybe<Scalars['String']>;
};

export type CreateTutorInput = {
  application_id?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type CreateUniversityInput = {
  abbrev: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  university: Scalars['String'];
  username: Scalars['String'];
};

export enum Direction {
  Asc = 'asc',
  Desc = 'desc'
}

export type Filter = {
  function: FilterOperation;
  prop: Scalars['String'];
  value: Scalars['String'];
};

export enum FilterOperation {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  Nin = 'nin'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptSession: Session;
  createApplication: TutorApplication;
  createApplicationCourse: TutorApplication;
  createClass: Class;
  createCourse: Course;
  createReview: Review;
  createSession: Session;
  createTutor: Tutor;
  createUniversity: University;
  createUser: User;
  deleteApplication: TutorApplication;
  deleteClass: Class;
  deleteCourse: Course;
  deleteReview: Review;
  deleteSession: Session;
  deleteTutor: Tutor;
  deleteUniversity: University;
  deleteUser: User;
  rejectSession: Session;
  updateApplication: TutorApplication;
  updateReview: Review;
  updateSession: Session;
  updateTutor: Tutor;
  updateUniversity: University;
  updateUser: User;
};


export type MutationAcceptSessionArgs = {
  _id: Scalars['String'];
  tutor_id: Scalars['String'];
};


export type MutationCreateApplicationArgs = {
  user_id: Scalars['String'];
};


export type MutationCreateApplicationCourseArgs = {
  input: CreateApplicationCourseInput;
  user_id: Scalars['String'];
};


export type MutationCreateClassArgs = {
  input: CreateClassInput;
  university_id: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
  tutor_id: Scalars['String'];
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
  user_id: Scalars['String'];
};


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


export type MutationCreateTutorArgs = {
  input?: InputMaybe<CreateTutorInput>;
};


export type MutationCreateUniversityArgs = {
  input: CreateUniversityInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteApplicationArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteClassArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteCourseArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteSessionArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteTutorArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUniversityArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};


export type MutationRejectSessionArgs = {
  _id: Scalars['String'];
  tutor_id: Scalars['String'];
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
  user_id: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  _id: Scalars['String'];
  input: UpdateReviewInput;
};


export type MutationUpdateSessionArgs = {
  _id: Scalars['String'];
  input: UpdateSessionInput;
};


export type MutationUpdateTutorArgs = {
  input?: InputMaybe<UpdateTutorInput>;
};


export type MutationUpdateUniversityArgs = {
  _id: Scalars['String'];
  input: UpdateUniversityInput;
};


export type MutationUpdateUserArgs = {
  _id: Scalars['String'];
  input: UpdateUserInput;
};

export type Paginate = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  application?: Maybe<TutorApplication>;
  applications: Array<TutorApplication>;
  class?: Maybe<Class>;
  classes: Array<Class>;
  course?: Maybe<Course>;
  courses: Array<Course>;
  review?: Maybe<Review>;
  reviews: Array<Review>;
  session?: Maybe<Session>;
  sessions: Array<Session>;
  tutor?: Maybe<Tutor>;
  tutors: Array<Tutor>;
  universities: Array<University>;
  university?: Maybe<University>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryApplicationArgs = {
  _id: Scalars['String'];
};


export type QueryApplicationsArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryClassArgs = {
  _id: Scalars['String'];
};


export type QueryClassesArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryCourseArgs = {
  _id: Scalars['String'];
};


export type QueryCoursesArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryReviewArgs = {
  _id: Scalars['String'];
};


export type QueryReviewsArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QuerySessionArgs = {
  _id: Scalars['String'];
};


export type QuerySessionsArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryTutorArgs = {
  _id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryTutorsArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryUniversitiesArgs = {
  input?: InputMaybe<QueryOptions>;
};


export type QueryUniversityArgs = {
  _id: Scalars['String'];
  abbrev: Scalars['String'];
};


export type QueryUserArgs = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<QueryOptions>;
};

export type QueryOptions = {
  filter?: InputMaybe<Filter>;
  paginate?: InputMaybe<Paginate>;
  search?: InputMaybe<Search>;
  sort?: InputMaybe<Sort>;
  timebox?: InputMaybe<Timebox>;
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['String'];
  createdAt: Scalars['String'];
  rating: Scalars['Int'];
  student: User;
  text: Scalars['String'];
};

export type Search = {
  case_sensitive?: InputMaybe<Scalars['Boolean']>;
  paths: Array<Scalars['String']>;
  value: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  _id: Scalars['String'];
  additional_info?: Maybe<Scalars['String']>;
  course: Course;
  created_date: Scalars['String'];
  is_accepted: Scalars['Boolean'];
  is_completed: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  payment_amount: Scalars['Float'];
  payment_fulfilled: Scalars['Boolean'];
  rating: Scalars['Int'];
  student: User;
  topic?: Maybe<Scalars['String']>;
  tutor: Tutor;
};

export type Slot = {
  __typename?: 'Slot';
  day: Scalars['String'];
  slots: Array<Scalars['Int']>;
};

export type SlotInput = {
  day: Scalars['String'];
  slots: Array<Scalars['Int']>;
};

export type Sort = {
  direction?: InputMaybe<Direction>;
  function?: InputMaybe<SortingFunction>;
  prop: Scalars['String'];
};

export enum SortingFunction {
  Default = 'default',
  Locale = 'locale'
}

export type Timebox = {
  create_prop?: InputMaybe<Scalars['String']>;
  created_after?: InputMaybe<Scalars['String']>;
  created_before?: InputMaybe<Scalars['String']>;
  update_prop?: InputMaybe<Scalars['String']>;
  updated_after?: InputMaybe<Scalars['String']>;
  updated_before?: InputMaybe<Scalars['String']>;
};

export type Tutor = {
  __typename?: 'Tutor';
  _id: Scalars['String'];
  courses: Array<Course>;
  date: Scalars['String'];
  in_person: Scalars['Boolean'];
  rate: Scalars['Float'];
  schedule: Array<Slot>;
  user: User;
  zoom_link?: Maybe<Scalars['String']>;
};

export type TutorApplication = {
  __typename?: 'TutorApplication';
  _id: Scalars['String'];
  answers: Array<Scalars['String']>;
  classes: Array<TutorApplicationCourse>;
  inperson?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Float']>;
  step: Scalars['Int'];
  transcript?: Maybe<Scalars['String']>;
  zoom_link?: Maybe<Scalars['String']>;
};

export type TutorApplicationCourse = {
  __typename?: 'TutorApplicationCourse';
  class_info: Class;
  grade?: Maybe<Scalars['String']>;
  professor?: Maybe<Scalars['String']>;
};

export type TutorApplicationCourseInput = {
  class_info: Scalars['String'];
  grade?: InputMaybe<Scalars['String']>;
  professor?: InputMaybe<Scalars['String']>;
};

export type University = {
  __typename?: 'University';
  _id: Scalars['String'];
  abbrev: Scalars['String'];
  classes: Array<Class>;
  country: Scalars['String'];
  created_at: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateApplicationInput = {
  answers?: InputMaybe<Array<Scalars['String']>>;
  inperson?: InputMaybe<Scalars['Boolean']>;
  rate?: InputMaybe<Scalars['Float']>;
  step: Scalars['Int'];
  transcript?: InputMaybe<Scalars['String']>;
  zoom_link?: InputMaybe<Scalars['String']>;
};

export type UpdateReviewInput = {
  rating?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateSessionInput = {
  is_accepted: Scalars['Boolean'];
  is_completed: Scalars['Boolean'];
  payment_fulfilled: Scalars['Boolean'];
  rating: Scalars['Int'];
};

export type UpdateTutorInput = {
  in_person: Scalars['Boolean'];
  rate: Scalars['Float'];
  schedule: Array<SlotInput>;
  zoom_link?: InputMaybe<Scalars['String']>;
};

export type UpdateUniversityInput = {
  abbrev?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  locations?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  classOf?: InputMaybe<Scalars['String']>;
  img_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  classes: Array<Class>;
  date: Scalars['String'];
  email: Scalars['String'];
  img_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  tutor?: Maybe<Tutor>;
  university?: Maybe<University>;
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Class: ResolverTypeWrapper<Class>;
  Course: ResolverTypeWrapper<Course>;
  CreateApplicationCourseInput: CreateApplicationCourseInput;
  CreateClassInput: CreateClassInput;
  CreateCourseInput: CreateCourseInput;
  CreateReviewInput: CreateReviewInput;
  CreateSessionInput: CreateSessionInput;
  CreateTutorInput: CreateTutorInput;
  CreateUniversityInput: CreateUniversityInput;
  CreateUserInput: CreateUserInput;
  Direction: Direction;
  Filter: Filter;
  FilterOperation: FilterOperation;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Paginate: Paginate;
  Query: ResolverTypeWrapper<{}>;
  QueryOptions: QueryOptions;
  Review: ResolverTypeWrapper<Review>;
  Search: Search;
  Session: ResolverTypeWrapper<Session>;
  Slot: ResolverTypeWrapper<Slot>;
  SlotInput: SlotInput;
  Sort: Sort;
  SortingFunction: SortingFunction;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timebox: Timebox;
  Tutor: ResolverTypeWrapper<Tutor>;
  TutorApplication: ResolverTypeWrapper<TutorApplication>;
  TutorApplicationCourse: ResolverTypeWrapper<TutorApplicationCourse>;
  TutorApplicationCourseInput: TutorApplicationCourseInput;
  University: ResolverTypeWrapper<University>;
  UpdateApplicationInput: UpdateApplicationInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateSessionInput: UpdateSessionInput;
  UpdateTutorInput: UpdateTutorInput;
  UpdateUniversityInput: UpdateUniversityInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Class: Class;
  Course: Course;
  CreateApplicationCourseInput: CreateApplicationCourseInput;
  CreateClassInput: CreateClassInput;
  CreateCourseInput: CreateCourseInput;
  CreateReviewInput: CreateReviewInput;
  CreateSessionInput: CreateSessionInput;
  CreateTutorInput: CreateTutorInput;
  CreateUniversityInput: CreateUniversityInput;
  CreateUserInput: CreateUserInput;
  Filter: Filter;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Mutation: {};
  Paginate: Paginate;
  Query: {};
  QueryOptions: QueryOptions;
  Review: Review;
  Search: Search;
  Session: Session;
  Slot: Slot;
  SlotInput: SlotInput;
  Sort: Sort;
  String: Scalars['String'];
  Timebox: Timebox;
  Tutor: Tutor;
  TutorApplication: TutorApplication;
  TutorApplicationCourse: TutorApplicationCourse;
  TutorApplicationCourseInput: TutorApplicationCourseInput;
  University: University;
  UpdateApplicationInput: UpdateApplicationInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateSessionInput: UpdateSessionInput;
  UpdateTutorInput: UpdateTutorInput;
  UpdateUniversityInput: UpdateUniversityInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type ClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['Class'] = ResolversParentTypes['Class']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  university?: Resolver<ResolversTypes['University'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  class?: Resolver<ResolversTypes['Class'], ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  grade?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  professor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  tutor?: Resolver<Array<ResolversTypes['Tutor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptSession?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationAcceptSessionArgs, '_id' | 'tutor_id'>>;
  createApplication?: Resolver<ResolversTypes['TutorApplication'], ParentType, ContextType, RequireFields<MutationCreateApplicationArgs, 'user_id'>>;
  createApplicationCourse?: Resolver<ResolversTypes['TutorApplication'], ParentType, ContextType, RequireFields<MutationCreateApplicationCourseArgs, 'input' | 'user_id'>>;
  createClass?: Resolver<ResolversTypes['Class'], ParentType, ContextType, RequireFields<MutationCreateClassArgs, 'input' | 'university_id'>>;
  createCourse?: Resolver<ResolversTypes['Course'], ParentType, ContextType, RequireFields<MutationCreateCourseArgs, 'input' | 'tutor_id'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input' | 'user_id'>>;
  createSession?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationCreateSessionArgs, 'input'>>;
  createTutor?: Resolver<ResolversTypes['Tutor'], ParentType, ContextType, Partial<MutationCreateTutorArgs>>;
  createUniversity?: Resolver<ResolversTypes['University'], ParentType, ContextType, RequireFields<MutationCreateUniversityArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteApplication?: Resolver<ResolversTypes['TutorApplication'], ParentType, ContextType, RequireFields<MutationDeleteApplicationArgs, '_id'>>;
  deleteClass?: Resolver<ResolversTypes['Class'], ParentType, ContextType, RequireFields<MutationDeleteClassArgs, '_id'>>;
  deleteCourse?: Resolver<ResolversTypes['Course'], ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, '_id'>>;
  deleteReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, '_id'>>;
  deleteSession?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationDeleteSessionArgs, '_id'>>;
  deleteTutor?: Resolver<ResolversTypes['Tutor'], ParentType, ContextType, RequireFields<MutationDeleteTutorArgs, '_id'>>;
  deleteUniversity?: Resolver<ResolversTypes['University'], ParentType, ContextType, RequireFields<MutationDeleteUniversityArgs, '_id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id'>>;
  rejectSession?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationRejectSessionArgs, '_id' | 'tutor_id'>>;
  updateApplication?: Resolver<ResolversTypes['TutorApplication'], ParentType, ContextType, RequireFields<MutationUpdateApplicationArgs, 'input' | 'user_id'>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, '_id' | 'input'>>;
  updateSession?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationUpdateSessionArgs, '_id' | 'input'>>;
  updateTutor?: Resolver<ResolversTypes['Tutor'], ParentType, ContextType, Partial<MutationUpdateTutorArgs>>;
  updateUniversity?: Resolver<ResolversTypes['University'], ParentType, ContextType, RequireFields<MutationUpdateUniversityArgs, '_id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, '_id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  application?: Resolver<Maybe<ResolversTypes['TutorApplication']>, ParentType, ContextType, RequireFields<QueryApplicationArgs, '_id'>>;
  applications?: Resolver<Array<ResolversTypes['TutorApplication']>, ParentType, ContextType, Partial<QueryApplicationsArgs>>;
  class?: Resolver<Maybe<ResolversTypes['Class']>, ParentType, ContextType, RequireFields<QueryClassArgs, '_id'>>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType, Partial<QueryClassesArgs>>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, '_id'>>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType, Partial<QueryCoursesArgs>>;
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, '_id'>>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType, Partial<QueryReviewsArgs>>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<QuerySessionArgs, '_id'>>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType, Partial<QuerySessionsArgs>>;
  tutor?: Resolver<Maybe<ResolversTypes['Tutor']>, ParentType, ContextType, Partial<QueryTutorArgs>>;
  tutors?: Resolver<Array<ResolversTypes['Tutor']>, ParentType, ContextType, Partial<QueryTutorsArgs>>;
  universities?: Resolver<Array<ResolversTypes['University']>, ParentType, ContextType, Partial<QueryUniversitiesArgs>>;
  university?: Resolver<Maybe<ResolversTypes['University']>, ParentType, ContextType, RequireFields<QueryUniversityArgs, '_id' | 'abbrev'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  additional_info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  created_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  is_completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payment_amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  payment_fulfilled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tutor?: Resolver<ResolversTypes['Tutor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SlotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Slot'] = ResolversParentTypes['Slot']> = {
  day?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slots?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TutorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tutor'] = ResolversParentTypes['Tutor']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  in_person?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['Slot']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  zoom_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TutorApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TutorApplication'] = ResolversParentTypes['TutorApplication']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  answers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes['TutorApplicationCourse']>, ParentType, ContextType>;
  inperson?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  step?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transcript?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoom_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TutorApplicationCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TutorApplicationCourse'] = ResolversParentTypes['TutorApplicationCourse']> = {
  class_info?: Resolver<ResolversTypes['Class'], ParentType, ContextType>;
  grade?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  professor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UniversityResolvers<ContextType = any, ParentType extends ResolversParentTypes['University'] = ResolversParentTypes['University']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  abbrev?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  img_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tutor?: Resolver<Maybe<ResolversTypes['Tutor']>, ParentType, ContextType>;
  university?: Resolver<Maybe<ResolversTypes['University']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Class?: ClassResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Slot?: SlotResolvers<ContextType>;
  Tutor?: TutorResolvers<ContextType>;
  TutorApplication?: TutorApplicationResolvers<ContextType>;
  TutorApplicationCourse?: TutorApplicationCourseResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

