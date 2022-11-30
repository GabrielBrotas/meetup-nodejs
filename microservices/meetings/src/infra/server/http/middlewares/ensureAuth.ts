import {Request, Response, NextFunction} from 'express'
import Token from 'keycloak-connect/middleware/auth-utils/token';
import Signature from 'keycloak-connect/middleware/auth-utils/signature';


export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers
    const tokenRaw = headers.authorization.split(" ").slice(-1)[0]
    
    const kcConfig = {
        clientId: "meetup-auth-client",
        publicCertificate: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArMryxKjmLTpsHIiF6cvSS5gTVwSW5SrtyCrIgCZqV8uhhAZ8DRIc34paDN0O2SQCZOx2PveZdqX7Ip3S/fQdl9HEWqRiB0zHfQzBHJ0Zn71RxJ3fzVXg1syXoMxvoaieA5R0g2DwCDYGcsNdiLm7KKD4lLsaZHO5GR9JWFzpgJg3UlYOBJ1sOzVKj7t+Tf7Nk3ooe9zr7tJtbzvO+rzce6VqkjlEuSrksM0Nn1ikR+7GgkOK10Rh/SCTL72BYgOQe9lv+mDuip6fPYnt4fFt03GNHamLm1AmukKj1cVG5D2YwibVTVd+445E9GGSDxyfdQdEFkXkCEqmkh3HjoFRPQIDAQAB",
        issuer: "https://lemur-17.cloud-iam.com/auth/realms/meetup-clone"
    }
    const token = new Token(tokenRaw, kcConfig.clientId)
    const signature = new Signature({
        realmUrl: kcConfig.issuer,
        publicKey: kcConfig.publicCertificate,
        minTimeBetweenJwksRequests: 0
    })

    try {
        signature.verify(token, null).then(token => {
            (req as any).user = token
            next()
        }).catch((err) => {
            console.error(err)
            res.status(401).json({success: false, message: "Unauthorized"})
        })
    } catch(err) {
        console.error(err)
        res.status(400).json({success: false, message: "Somethin went wrong"})
    }
}