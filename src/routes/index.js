import { authRoutes } from './auth'
import { baseRoutes } from './base'

export const routes = [...baseRoutes, ...authRoutes]
