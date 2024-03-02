export const ExtractJwtSecret = async () => {
  return process.env.JWT_SECRET_KEY || '';
};

export const ExtractJwtExpiry = async () => {
  return process.env.JWT_SECRET_EXPIRY || '';
};
