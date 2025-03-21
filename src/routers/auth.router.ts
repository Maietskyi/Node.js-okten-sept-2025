import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";

const router = Router();
router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
)

router.post("/sign-in", authController.signIn)

export const authRouter = router;