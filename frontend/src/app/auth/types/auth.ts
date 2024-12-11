export interface authTokenInt {
	token: string
    avatar: string;
}

export interface JwtDecode {
    exp: number;
    is_admin: boolean;
    sub: string;
    user_id: number;
}