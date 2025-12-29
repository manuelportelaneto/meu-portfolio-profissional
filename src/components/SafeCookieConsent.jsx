import React, { Suspense } from 'react';

// Tenta importar o componente. Se falhar (bloqueado por adblocker), retorna um componente vazio.
const CookieConsent = React.lazy(() =>
    import('react-cookie-consent').catch(error => {
        console.warn("CookieConsent blocked or failed to load:", error);
        return { default: () => null };
    })
);

const SafeCookieConsent = (props) => {
    return (
        <Suspense fallback={null}>
            <CookieConsent {...props} />
        </Suspense>
    );
};

export default SafeCookieConsent;
