import { app } from "../server/app";
import { registerRoutes } from "../server/routes";

// Register routes (we don't pass httpServer as it's not available in serverless)
// We must await this promise to ensure routes are registered before handling requests
const initPromise = registerRoutes(app);

export default async function handler(req: any, res: any) {
    await initPromise;
    app(req, res);
}
