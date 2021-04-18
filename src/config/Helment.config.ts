import helmet from 'helmet';

/**
 * Alpine has a serious security concern where it uses 'new Function'
 * which can only run if CSP "'unsafe-eval'" is set for script-src
 */
export const CSPDirectives = {
    directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'code.jquery.com', "'unsafe-eval'"],
        styleSrc: ["'self'", 'unpkg.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'code.jquery.com'],
        imgSrc: ["'self'", 'source.unsplash.com', 'images.unsplash.com', 'user-images.githubusercontent.com'],
        objectSrc: ["'none'"],
        fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
    },
};

export const CSP: Parameters<typeof helmet>[0] = {
    contentSecurityPolicy: false,
};
