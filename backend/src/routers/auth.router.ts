import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.midleware";
import { AuthValidator } from "../validators/auth.validator";
import { RecoveryValidator } from "../validators/recovery.validator";

const router = Router();
router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);

router.post("/sign-in", authController.signIn);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.get(
    "/me",
    authMiddleware.checkAccessToken,
    authController.me,
);

router.patch("/activate/:token", authController.activate);

router.post("/recovery", commonMiddleware.validateBody(RecoveryValidator.emailSchema),
    authController.passwordRecoveryRequest);

router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.validatePassword),
    authController.recoveryPassword,
);

export const authRouter = router;