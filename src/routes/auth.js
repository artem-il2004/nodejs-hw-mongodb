import { Router } from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateSchema } from '../utils/validateBody.js';
import { authRegisterSchema, loginUserSchema } from '../validation/auth.js';
import { loginUserController, registerController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';


const authRouter = Router();
 
// sign in 

authRouter.post("/register", validateSchema(authRegisterSchema),ctrlWrapper(registerController));
authRouter.post("/login", validateSchema(loginUserSchema),ctrlWrapper(loginUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post(
  '/send-reset-email',
  validateSchema(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
authRouter.post(
  '/reset-pwd',
  validateSchema(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default authRouter;