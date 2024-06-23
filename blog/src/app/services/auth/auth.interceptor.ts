import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                'x-auth-token': `Barrer ${token}`
            }
        });
        return next(authReq);
    } else {
        return next(req);
    }
}

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//     // Sprawdzenie czy kod działa w przeglądarce
//     if (typeof window !== 'undefined' && window.localStorage) {
//         const token = localStorage.getItem('token');
        
//         if (token) {
//             const authReq = req.clone({
//                 setHeaders: {
//                     'x-auth-token': `Bearer ${token}`
//                 }
//             });
//             return next(authReq);
//         }
//     }

//     // Jeśli token nie jest dostępny lub kod działa na serwerze, przekazujemy żądanie bez modyfikacji
//     return next(req);
// }

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//     // Check if the code is running in the browser
//     if (typeof window !== 'undefined' && window.localStorage) {
//         const token = localStorage.getItem('token');
        
//         if (token) {
//             const authReq = req.clone({
//                 setHeaders: {
//                     'x-auth-token': `Bearer ${token}`
//                 }
//             });
//             return next(authReq);
//         }
//     }

//     // If token is not available or the code is running on the server, pass the request without modification
//     return next(req);
// }