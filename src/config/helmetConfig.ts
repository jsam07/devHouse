import helmet from 'helmet';

export const CSPDirectives = {
    directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'unpkg.com'],
        imgSrc: ["'self'", 'source.unsplash.com', 'images.unsplash.com'],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
    },
};

export const CSP: Parameters<typeof helmet>[0] = {
    contentSecurityPolicy: false,
};
