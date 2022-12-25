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
  Courses: Array<Course>;
  desc: Scalars['String'];
  name: Scalars['String'];
  students: Array<User>;
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['String'];
  desc: Scalars['String'];
  rating: Scalars['Float'];
  reviews: Array<Review>;
  sessions: Array<Session>;
  students: Array<User>;
  tutor: Array<Tutor>;
};

export enum Day {
  Friday = 'friday',
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday',
  Thursday = 'thursday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday'
}

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

export type Paginate = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  _id: Scalars['String'];
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
  body: Scalars['String'];
  createdAt: Scalars['String'];
  rating: Scalars['Int'];
  user: User;
};

export type Search = {
  case_sensitive?: InputMaybe<Scalars['Boolean']>;
  paths: Array<Scalars['String']>;
  value: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  _id: Scalars['String'];
  course: Course;
  date: Scalars['String'];
  is_completed: Scalars['Boolean'];
  payment_amount: Scalars['Float'];
  payment_fulfilled: Scalars['Boolean'];
  student: User;
};

export type Slot = {
  __typename?: 'Slot';
  day: Day;
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
  rate: Scalars['Float'];
  schedule: Array<Slot>;
  user: User;
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

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  classes: Array<Class>;
  date: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  university: University;
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
  Day: Day;
  Direction: Direction;
  Filter: Filter;
  FilterOperation: FilterOperation;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Paginate: Paginate;
  Query: ResolverTypeWrapper<{}>;
  QueryOptions: QueryOptions;
  Review: ResolverTypeWrapper<Review>;
  Search: Search;
  Session: ResolverTypeWrapper<Session>;
  Slot: ResolverTypeWrapper<Slot>;
  Sort: Sort;
  SortingFunction: SortingFunction;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timebox: Timebox;
  Tutor: ResolverTypeWrapper<Tutor>;
  University: ResolverTypeWrapper<University>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Class: Class;
  Course: Course;
  Filter: Filter;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Paginate: Paginate;
  Query: {};
  QueryOptions: QueryOptions;
  Review: Review;
  Search: Search;
  Session: Session;
  Slot: Slot;
  Sort: Sort;
  String: Scalars['String'];
  Timebox: Timebox;
  Tutor: Tutor;
  University: University;
  User: User;
};

export type ClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['Class'] = ResolversParentTypes['Class']> = {
  Courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  tutor?: Resolver<Array<ResolversTypes['Tutor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  payment_amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  payment_fulfilled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SlotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Slot'] = ResolversParentTypes['Slot']> = {
  day?: Resolver<ResolversTypes['Day'], ParentType, ContextType>;
  slots?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TutorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tutor'] = ResolversParentTypes['Tutor']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['Slot']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  university?: Resolver<ResolversTypes['University'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Class?: ClassResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Slot?: SlotResolvers<ContextType>;
  Tutor?: TutorResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

