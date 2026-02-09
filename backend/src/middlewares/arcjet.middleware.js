import { aj } from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

const rateLimiter = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    console.log(decision.isDenied());
    console.log(decision.reason.isRateLimit());
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too Many Requests, Please try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "No bots allowed" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security purpose" });
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detectd",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next();
  }
};

export default rateLimiter;
