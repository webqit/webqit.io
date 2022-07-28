
/**
 * Handles main HTTP process.
 * 
 * @param HttpEvent     httpEvent
 * @param Any           context
 * @param Function      next
 * 
 * @return object
 */
export default async (httpEvent, context, next) => {
    if (next.pathname) {
        return next();
    }
    return { title: 'The WebQit Project', };
}