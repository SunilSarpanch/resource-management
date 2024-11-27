import { LessThan } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Resource } from "../entity/resource.entity";

// This job will run every minute to check for expired resources
export async function cleanupExpiredResources() {
  const resourceRepository = AppDataSource.getRepository(Resource);
  const resources = await resourceRepository.find({
    where: { expiresAt: LessThan(new Date()), isExpired: false },
  });

  for (const resource of resources) {
    resource.isExpired = true;
    await resourceRepository.save(resource);
    console.log(`Resource ${resource.id} has expired.`);
  }
}
