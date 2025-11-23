export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie('auth_token')
    const cartId = useCookie("cart_id");

    if (to.path.includes('/profile') && !authToken.value) {
        return navigateTo({ path: '/sign-in' }, { redirectCode: 301 })
    }
    if (to.path === "/home" || to.path.includes("/home.")) {
        return navigateTo({ path: "/" }, { redirectCode: 301 });
    }
    if (to.path === "/index" || to.path.includes("/index.")) {
        return navigateTo({ path: "/" }, { redirectCode: 301 });
    }
    if (to.path === "/sign-up" && authToken.value) {
        return navigateTo({ path: "/" }, { redirectCode: 301 });
    }
    if (to.path !== to.path.toLowerCase()) {
        return navigateTo(to.path.toLowerCase(), { redirectCode: 301 });
    }

    if (to.fullPath.slice(-1) === '/' && to.fullPath !== '/') {
        return navigateTo(to.fullPath.slice(0, -1), { redirectCode: 301 })
    }
    if (to.path.includes('/checkout') && !cartId.value) {
        return navigateTo({ path: '/' }, { redirectCode: 301 })
    }
})
