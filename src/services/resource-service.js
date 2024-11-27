export function checkResourceExpiration(resource) {
  const currentTime = new Date();
  if (currentTime > new Date(resource.expirationTime)) {
    resource.isExpired = true;
    resource.save();
    return true;
  }
  return false;
}
