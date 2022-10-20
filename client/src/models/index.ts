export interface IUser {
  _id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  dateBirth?: string;
  gender?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface IResponse {
  docs?: IUser[];
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: any;
  nextPage?: number;
}

export interface Inputs {
  fullName?: string;
  email?: string;
  password?: string;
  dateBirth?: string;
  gender?: string;
  avatar?: string;
}

export interface FormProps {
  onSubmit?: () => void
  handleSubmit?: () => void
  register?: any
  user?: IUser
}

