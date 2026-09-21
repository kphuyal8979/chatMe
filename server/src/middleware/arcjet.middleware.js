import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decison = await aj.protect(req);
    if (decison.isDenied()) {
      if (decison.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded try again later",
        });
      } else if (decison.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied",
        });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy",
        });
      }
    }

    if (decison.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected ",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    console.error(`arcjet protection error`, error);
    next();
  }
};
