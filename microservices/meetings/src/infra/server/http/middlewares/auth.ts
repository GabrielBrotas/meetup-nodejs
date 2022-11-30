import { Request, Response, NextFunction } from "express";
import Token from "keycloak-connect/middleware/auth-utils/token";
import Signature from "keycloak-connect/middleware/auth-utils/signature";

const kcConfig = {
  issuer: process.env.keycloakIssuer,
  publicCertificate: process.env.keycloakPublicCert,
  clientId: process.env.keycloakClientId,
};

type IUserFromToken = {
  name: string;
  groups: string[];
  team: string;
  email_verified: boolean;
};

function extractUserDataFromToken(token): IUserFromToken {
  return {
    name: token.content.name,
    groups: token.content.groups,
    team: token.contenct.team,
    email_verified: token.content.email_verified,
  };
}

export const ensureAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string = null
) => {
  const headers = req.headers;

  if (!headers.authorization) {
    res
      .status(400)
      .json({ success: false, message: "Missing authorization token" });
  }

  const tokenRaw = headers.authorization.split(" ")[1];

  const token = new Token(tokenRaw, kcConfig.clientId);
  const signature = new Signature({
    realmUrl: kcConfig.issuer,
    publicKey: kcConfig.publicCertificate,
    minTimeBetweenJwksRequests: 0,
  });

  try {
    signature
      .verify(token, null)
      .then((token) => {
        const user = extractUserDataFromToken(token);

        (req as any).user = { ...user };

        console.log({ user, role });

        if (role) {
          if (!user.groups.some((g) => g == `/${role}`)) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
          }
        }

        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(401).json({ success: false, message: "Unauthorized" });
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Somethin went wrong" });
  }
};
