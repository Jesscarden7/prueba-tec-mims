export type responseType<T> = {
  data?: T;
  errorMessage?: string;
  isSuccesful: boolean;
};
