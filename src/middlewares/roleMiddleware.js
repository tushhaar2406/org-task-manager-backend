const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message:
            "Access denied: You do not have permission to perform this action",
        });
      }
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      res
        .status(500)
        .json({ message: "Server error in role middleware" });
    }
  };
};

export default roleMiddleware;
