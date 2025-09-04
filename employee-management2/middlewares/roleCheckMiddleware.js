function roleCheckMiddleware(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.headers['x-role'];
    
    if (!userRole) {
      return res.status(401).json({ error: 'Role header (x-role) is required' });
    }
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions' });
    }
    
    next();
  };
}

module.exports = roleCheckMiddleware;