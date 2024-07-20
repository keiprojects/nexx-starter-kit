export type Roles = "ADMIN" | "USER";

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles;
		};
	}
}
