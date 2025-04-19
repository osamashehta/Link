export type SignUpData = {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: Date;
    gender: "male" | "female";
}
export type LoginData = {
    email: string;
    password: string;
}