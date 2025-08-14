interface JwtPayload {
  id: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

export default JwtPayload;
