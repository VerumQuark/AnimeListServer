module.exports =
  /**
   * For each route in the routes array, add a route to the express app using the method
   * and route from the route object, and use the handler function from the route object
   * to handle the request.
   * @param routes - An array of routes.
   * @param app - Express app
   */
  function routeFactory(routes, app) {
    routes.forEach((route) => {
      const method = route.method;
      const uri = route.route;
      app[method](uri, async (req, res, next) => {
        try {
          const result = await route.handler(req, res, next);
          return res.status(result.status).json(result.data);
        } catch (err) {
          return next(err);
        }
      });
    });
  };
