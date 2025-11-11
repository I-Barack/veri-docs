import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

// Validate JWTs automatically. In development we provide a noop middleware
// that injects a fake `req.auth.payload` so local requests work without a token.
const isDev = process.env.NODE_ENV !== "production";

const verifyAccessToken = isDev
  ? (req, res, next) => {
      // Inject a dev payload (only for local development)
      req.auth = {
        payload: { sub: "dev-user", "https://veridocs.com/roles": ["admin"] },
      };
      next();
    }
  : auth({
      audience: process.env.AUTHO_AUDIENCE,
      issuerBaseURL: process.env.AUTHO_DOMAIN,
      tokenSigningAlg: "RS256",
    });

// Check roles
const checkRoles = (roles = []) => {
  return (req, res, next) => {
    const user = req.auth?.payload;
    if (!user) return res.status(401).json({ message: "Unauthenticated" });

    const userRole = user["https://veridocs.com/roles"] || [];
    const hasRole = roles.some((r) => userRole.includes(r));
    if (!hasRole) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

const requireScopes = requiredScopes("read:documents");

export { verifyAccessToken, checkRoles, requireScopes };
