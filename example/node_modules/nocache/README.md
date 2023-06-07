# Middleware to turn off caching

This Express middleware sets some HTTP response headers to try to disable client-side caching.

To use it:

```javascript
const nocache = require("nocache");

// ...

app.use(nocache());
```

This sets four headers, disabling a lot of browser caching:

- `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate`
- `Pragma: no-cache`
- `Expires: 0`
- `Surrogate-Control: no-store`

You may wish to do this if you want to ensure that users have up-to-date resources, or if you want to clear out an old version for some reason.
