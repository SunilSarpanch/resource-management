import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { Resource } from "../entity/resource.entity";

export class ResourceController {
  static async createResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { url, expirationTime } = req.body;

      const userId = req["user"].id;

      const resource = new Resource();
      resource.resourceType = "link";
      resource.resourceUrl = url;

      const expirationDateTime = new Date(Date.now() + expirationTime * 60000)
      resource.expiresAt = expirationDateTime;
      resource.userId = userId;

      const resourceRepository = AppDataSource.getRepository(Resource);
      await resourceRepository.save(resource);
      return res
        .status(200)
        .json({ message: "Resource created successfully", resource });
    } catch (err) {
      next(err);
    }
  }

  static async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;

      let filter = {};

      if (status === "active") {
        filter = {
          where: { isExpired: false },
        };
      } else if (status === "expired") {
        filter = {
          where: { isExpired: true },
        };
      }

      const resourceRepository = AppDataSource.getRepository(Resource);
      const resources = await resourceRepository.find(filter);

      if (!resources?.length) {
        return res.status(404).json({ message: "Resources not found" });
      }

      return res.status(200).json({
        data: resources,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getResourceById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const resourceRepository = AppDataSource.getRepository(Resource);
      const resource = await resourceRepository.findOne({
        where: { id, isExpired: false },
      });

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      return res.status(200).json({
        data: resource,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userId = req["user"].id;

      const resourceRepository = AppDataSource.getRepository(Resource);
      const resource = await resourceRepository.findOne({
        where: { id, userId: userId },
      });

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      await resourceRepository.remove(resource);
      return res
        .status(200)
        .json({ message: "Resource deleted successfully", resource });
    } catch (err) {
      next(err);
    }
  }
}
