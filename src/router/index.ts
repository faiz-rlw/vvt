import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import routes from 'virtual:generated-pages'
import NProgress from 'nprogress'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:setupLayouts(routes),
})

router.beforeEach(() => {
    NProgress.start()
})
router.afterEach(() => {
    NProgress.done()
})


export default router