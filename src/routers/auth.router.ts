import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.midleware";

const router = Router();
router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
)

router.post("/sign-in", authController.signIn);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;