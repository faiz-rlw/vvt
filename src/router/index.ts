import fileRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const router = createRouter({
	routes: setupLayouts(fileRoutes),
	history: createWebHistory()
})


router.beforeEach(() => {
    NProgress.start()
})
router.afterEach(() => {
    NProgress.done()
})


export default router