export const injectDataToResponse = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    // Add the user role (or other data) to the response body

    console.log("originalJson", originalJson);

    console.log("res.locals", res.locals);
    if (res.locals.accessToken) {
      body.accessToken = res.locals.accessToken;
    }
    if (res.locals.refreshToken) {
      body.refreshToken = res.locals.refreshToken;
    }

    // Call the original res.json with the modified body
    return originalJson.call(this, body);
  };

  next();
};
