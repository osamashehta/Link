export type SignUpData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: Date;
  gender: "male" | "female";
};
export type LoginData = {
  email: string;
  password: string;
};

export type Post = {
  _id: string;
  image: string;
  body: string;
  createdAt: string;
  user: User;
  comments: TComments[];
};
export type User = {
  _id: string;
  name: string;
  photo: string;
};
export type TComments = {
  _id: string;
  content: string;
  post: string;
  createdAt: string;
  commentCreator: User;
};
