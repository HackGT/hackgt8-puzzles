import { URL } from "url";
import passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import dotenv from "dotenv"
import fetch from "node-fetch";
import { Request } from "express";
import { IUser, User } from "../entity/User";
import { createNew } from "../entity/database";
import { userRoutes } from "routes/user";
import { anonUser } from "../utils/anon";

dotenv.config()

type PassportDone = (err: Error | null, user?: IUser | false, errMessage?: { message: string }) => void;
type PassportProfileDone = (err: Error | null, profile?: IProfile) => void;

interface IStrategyOptions {
    passReqToCallback: true; // Forced to true for our usecase
}

interface IOAuthStrategyOptions extends IStrategyOptions {
    authorizationURL: string;
    tokenURL: string;
    clientID: string;
    clientSecret: string;
}

interface IProfile {
    uuid: string;
    name: string;
    email: string;
    token: string;
}

export type AuthenticateOptions = passport.AuthenticateOptions & {
    callbackURL: string;
};

export class GroundTruthStrategy extends OAuthStrategy {
    public readonly url: string;

    constructor(url: string) {
        const secret = (process.env.GROUND_TRUTH_SECRET);
        const id = (process.env.GROUND_TRUTH_ID);
        if (!secret || !id) {
            throw new Error(`Client ID or secret not configured in environment variables for Ground Truth`);
        }
        let options: IOAuthStrategyOptions = {
            authorizationURL: new URL("/oauth/authorize", url).toString(),
            tokenURL: new URL("/oauth/token", url).toString(),
            clientID: id,
            clientSecret: secret,
            passReqToCallback: true
        };
        super(options, GroundTruthStrategy.passportCallback);
        this.url = url;
    }

    public userProfile(accessToken: string, done: PassportProfileDone) {
        (this._oauth2 as any)._request("GET", new URL("/api/user", this.url).toString(), null, null, accessToken, (err: Error | null, data: string) => {
            if (err) {
                done(err);
                return;
            }
            try {
                let profile: IProfile = {
                    ...JSON.parse(data),
                    token: accessToken
                };
                done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    }

    protected static async passportCallback(req: Request, accessToken: string, refreshToken: string, profile: IProfile, done: PassportDone) {
        const query = `
                query($search: String!) {
                    search_user(search: $search, offset: 0, n: 1) {
                        users {
                            confirmed
                        }
                    }
                }
            `;

        const variables = {
            search: profile.email
        };

        // const res = await fetch(process.env.GRAPHQL_URL || "https://registration.hack.gt/graphql", {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": "Bearer " + (process.env.GRAPHQL_AUTH || "secret"),
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         query,
        //         variables
        //     })
        // });

        // const data = await res.json();

        // if (!data || data.data.search_user.users.length === 0 || !data.data.search_user.users[0].confirmed) {
        //     done(new Error("User is not confirmed in registration"), undefined);
        // }

        let user = await User.findOne({ uuid: profile.uuid });

        if (!user) {
            user = createNew<IUser>(User, {
                ...profile,
                displayname: anonUser(profile.name),
                points: 0,
                puzzlesCompleted: [],
                admin: false
            });
        } else {
            user.token = accessToken;
            user.displayname = anonUser(profile.name);
            user.email = profile.email;
            user.name = profile.name;
            user.uuid = profile.uuid;
        }    

        await user.save();
        done(null, user);
    }
}

function getExternalPort(req: Request): number {
    function defaultPort(): number {
        // Default ports for HTTP and HTTPS
        return req.protocol === "http" ? 80 : 443;
    }

    const host = req.headers.host;

    if (!host || Array.isArray(host)) {
        return defaultPort();
    }

    // IPv6 literal support
    const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    const index = host.indexOf(":", offset);

    if (index !== -1) {
        return parseInt(host.substring(index + 1), 10);
    }
    else {
        return defaultPort();
    }
}

export function createLink(req: Request, link: string): string {
    if (link[0] === "/") {
        link = link.substring(1);
    }
    if ((req.secure && getExternalPort(req) === 443) || (!req.secure && getExternalPort(req) === 80)) {
        return `http${req.secure ? "s" : ""}://${req.hostname}/${link}`;
    }
    else {
        return `http${req.secure ? "s" : ""}://${req.hostname}:${getExternalPort(req)}/${link}`;
    }
}
