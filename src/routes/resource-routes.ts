import * as multer from 'multer';
import * as express from "express";
import { authentication } from "../middlewares/authentication";
import { ResourceController } from "../controllers/resource-controller";
import { validate } from '../validations/validation';
import { resourceValidationRules } from '../validations/resourceValidation';

const router = express.Router();

// const upload = multer({
//   dest: 'files/',
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   const { expirationInMinutes } = req.body;
//   const expirationTime = new Date(Date.now() + expirationInMinutes * 60000);
//   res.json({ message: 'Resource uploaded successfully', resourceId: resource._id });
// });

router.post('/resources', resourceValidationRules(), validate, authentication, ResourceController.createResource);

router.get('/resources', authentication, ResourceController.getResources);

router.get('/resources/:id', authentication, ResourceController.getResourceById);

router.delete('/resources/:id', authentication, ResourceController.deleteResource);

export { router as resourceRoutes };
