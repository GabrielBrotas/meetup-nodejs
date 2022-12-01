import { Request, Response, NextFunction } from 'express';
const Token = require('keycloak-connect/middleware/auth-utils/token');
const Signature = require('keycloak-connect/middleware/auth-utils/signature');

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
    team: token.content.team,
    email_verified: token.content.email_verified,
  };
}

export const ensureAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string = null,
) => {
  const headers = req.headers;

  const kcConfig = {
    issuer: process.env.keycloakIssuer,
    publicCertificate: process.env.keycloakPublicCert,
    clientId: process.env.keycloakClientId,
  };

  if (!headers.authorization) {
    res
      .status(400)
      .json({ success: false, message: 'Missing authorization token' });
    return;
  }

  const tokenRaw = headers.authorization.split(' ')[1];

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
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
          }
        }

        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Somethin went wrong' });
    return;
  }
};
