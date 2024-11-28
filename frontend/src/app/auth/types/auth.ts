export interface authTokenInt {
	token: string
}

export interface JwtDecode {
    exp: number;
    is_admin: boolean;
    sub: string;
    user_id: number;
}