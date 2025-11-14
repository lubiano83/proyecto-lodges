export default interface JwtInterface {
  // agrega acá lo que tú metas dentro del token:
  email: string;
  role: string;
  iat: number;
  exp: number;
}
