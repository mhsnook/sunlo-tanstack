/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LearnImport } from './routes/learn'
import { Route as UserImport } from './routes/_user'
import { Route as AuthImport } from './routes/_auth'
import { Route as LearnIndexImport } from './routes/learn/index'
import { Route as LearnQuickSearchImport } from './routes/learn/quick-search'
import { Route as LearnAddDeckImport } from './routes/learn/add-deck'
import { Route as LearnLangImport } from './routes/learn/$lang'
import { Route as UserProfileImport } from './routes/_user/profile'
import { Route as UserGettingStartedImport } from './routes/_user/getting-started'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as LearnLangIndexImport } from './routes/learn/$lang/index'
import { Route as LearnLangSearchImport } from './routes/learn/$lang/search'
import { Route as LearnLangReviewImport } from './routes/learn/$lang/review'
import { Route as LearnLangPublicLibraryImport } from './routes/learn/$lang/public-library'
import { Route as LearnLangInviteFriendImport } from './routes/learn/$lang/invite-friend'
import { Route as LearnLangDeckSettingsImport } from './routes/learn/$lang/deck-settings'
import { Route as LearnLangAddPhraseImport } from './routes/learn/$lang/add-phrase'
import { Route as UserProfileChangePasswordImport } from './routes/_user/profile.change-password'
import { Route as UserProfileChangeEmailImport } from './routes/_user/profile.change-email'

// Create Virtual Routes

const PrivacyPolicyLazyImport = createFileRoute('/privacy-policy')()
const ComponentsLazyImport = createFileRoute('/components')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const AuthSignupLazyImport = createFileRoute('/_auth/signup')()
const AuthSetNewPasswordLazyImport = createFileRoute(
  '/_auth/set-new-password',
)()
const AuthForgotPasswordLazyImport = createFileRoute('/_auth/forgot-password')()

// Create/Update Routes

const PrivacyPolicyLazyRoute = PrivacyPolicyLazyImport.update({
  path: '/privacy-policy',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/privacy-policy.lazy').then((d) => d.Route),
)

const ComponentsLazyRoute = ComponentsLazyImport.update({
  path: '/components',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/components.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const LearnRoute = LearnImport.update({
  path: '/learn',
  getParentRoute: () => rootRoute,
} as any)

const UserRoute = UserImport.update({
  id: '/_user',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const LearnIndexRoute = LearnIndexImport.update({
  path: '/',
  getParentRoute: () => LearnRoute,
} as any)

const AuthSignupLazyRoute = AuthSignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/signup.lazy').then((d) => d.Route))

const AuthSetNewPasswordLazyRoute = AuthSetNewPasswordLazyImport.update({
  path: '/set-new-password',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/set-new-password.lazy').then((d) => d.Route),
)

const AuthForgotPasswordLazyRoute = AuthForgotPasswordLazyImport.update({
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/forgot-password.lazy').then((d) => d.Route),
)

const LearnQuickSearchRoute = LearnQuickSearchImport.update({
  path: '/quick-search',
  getParentRoute: () => LearnRoute,
} as any)

const LearnAddDeckRoute = LearnAddDeckImport.update({
  path: '/add-deck',
  getParentRoute: () => LearnRoute,
} as any)

const LearnLangRoute = LearnLangImport.update({
  path: '/$lang',
  getParentRoute: () => LearnRoute,
} as any)

const UserProfileRoute = UserProfileImport.update({
  path: '/profile',
  getParentRoute: () => UserRoute,
} as any)

const UserGettingStartedRoute = UserGettingStartedImport.update({
  path: '/getting-started',
  getParentRoute: () => UserRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const LearnLangIndexRoute = LearnLangIndexImport.update({
  path: '/',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangSearchRoute = LearnLangSearchImport.update({
  path: '/search',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangReviewRoute = LearnLangReviewImport.update({
  path: '/review',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangPublicLibraryRoute = LearnLangPublicLibraryImport.update({
  path: '/public-library',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangInviteFriendRoute = LearnLangInviteFriendImport.update({
  path: '/invite-friend',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangDeckSettingsRoute = LearnLangDeckSettingsImport.update({
  path: '/deck-settings',
  getParentRoute: () => LearnLangRoute,
} as any)

const LearnLangAddPhraseRoute = LearnLangAddPhraseImport.update({
  path: '/add-phrase',
  getParentRoute: () => LearnLangRoute,
} as any)

const UserProfileChangePasswordRoute = UserProfileChangePasswordImport.update({
  path: '/change-password',
  getParentRoute: () => UserProfileRoute,
} as any)

const UserProfileChangeEmailRoute = UserProfileChangeEmailImport.update({
  path: '/change-email',
  getParentRoute: () => UserProfileRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_user': {
      id: '/_user'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/learn': {
      id: '/learn'
      path: '/learn'
      fullPath: '/learn'
      preLoaderRoute: typeof LearnImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/components': {
      id: '/components'
      path: '/components'
      fullPath: '/components'
      preLoaderRoute: typeof ComponentsLazyImport
      parentRoute: typeof rootRoute
    }
    '/privacy-policy': {
      id: '/privacy-policy'
      path: '/privacy-policy'
      fullPath: '/privacy-policy'
      preLoaderRoute: typeof PrivacyPolicyLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_user/getting-started': {
      id: '/_user/getting-started'
      path: '/getting-started'
      fullPath: '/getting-started'
      preLoaderRoute: typeof UserGettingStartedImport
      parentRoute: typeof UserImport
    }
    '/_user/profile': {
      id: '/_user/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof UserProfileImport
      parentRoute: typeof UserImport
    }
    '/learn/$lang': {
      id: '/learn/$lang'
      path: '/$lang'
      fullPath: '/learn/$lang'
      preLoaderRoute: typeof LearnLangImport
      parentRoute: typeof LearnImport
    }
    '/learn/add-deck': {
      id: '/learn/add-deck'
      path: '/add-deck'
      fullPath: '/learn/add-deck'
      preLoaderRoute: typeof LearnAddDeckImport
      parentRoute: typeof LearnImport
    }
    '/learn/quick-search': {
      id: '/learn/quick-search'
      path: '/quick-search'
      fullPath: '/learn/quick-search'
      preLoaderRoute: typeof LearnQuickSearchImport
      parentRoute: typeof LearnImport
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/set-new-password': {
      id: '/_auth/set-new-password'
      path: '/set-new-password'
      fullPath: '/set-new-password'
      preLoaderRoute: typeof AuthSetNewPasswordLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupLazyImport
      parentRoute: typeof AuthImport
    }
    '/learn/': {
      id: '/learn/'
      path: '/'
      fullPath: '/learn/'
      preLoaderRoute: typeof LearnIndexImport
      parentRoute: typeof LearnImport
    }
    '/_user/profile/change-email': {
      id: '/_user/profile/change-email'
      path: '/change-email'
      fullPath: '/profile/change-email'
      preLoaderRoute: typeof UserProfileChangeEmailImport
      parentRoute: typeof UserProfileImport
    }
    '/_user/profile/change-password': {
      id: '/_user/profile/change-password'
      path: '/change-password'
      fullPath: '/profile/change-password'
      preLoaderRoute: typeof UserProfileChangePasswordImport
      parentRoute: typeof UserProfileImport
    }
    '/learn/$lang/add-phrase': {
      id: '/learn/$lang/add-phrase'
      path: '/add-phrase'
      fullPath: '/learn/$lang/add-phrase'
      preLoaderRoute: typeof LearnLangAddPhraseImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/deck-settings': {
      id: '/learn/$lang/deck-settings'
      path: '/deck-settings'
      fullPath: '/learn/$lang/deck-settings'
      preLoaderRoute: typeof LearnLangDeckSettingsImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/invite-friend': {
      id: '/learn/$lang/invite-friend'
      path: '/invite-friend'
      fullPath: '/learn/$lang/invite-friend'
      preLoaderRoute: typeof LearnLangInviteFriendImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/public-library': {
      id: '/learn/$lang/public-library'
      path: '/public-library'
      fullPath: '/learn/$lang/public-library'
      preLoaderRoute: typeof LearnLangPublicLibraryImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/review': {
      id: '/learn/$lang/review'
      path: '/review'
      fullPath: '/learn/$lang/review'
      preLoaderRoute: typeof LearnLangReviewImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/search': {
      id: '/learn/$lang/search'
      path: '/search'
      fullPath: '/learn/$lang/search'
      preLoaderRoute: typeof LearnLangSearchImport
      parentRoute: typeof LearnLangImport
    }
    '/learn/$lang/': {
      id: '/learn/$lang/'
      path: '/'
      fullPath: '/learn/$lang/'
      preLoaderRoute: typeof LearnLangIndexImport
      parentRoute: typeof LearnLangImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthLoginRoute,
    AuthForgotPasswordLazyRoute,
    AuthSetNewPasswordLazyRoute,
    AuthSignupLazyRoute,
  }),
  UserRoute: UserRoute.addChildren({
    UserGettingStartedRoute,
    UserProfileRoute: UserProfileRoute.addChildren({
      UserProfileChangeEmailRoute,
      UserProfileChangePasswordRoute,
    }),
  }),
  LearnRoute: LearnRoute.addChildren({
    LearnLangRoute: LearnLangRoute.addChildren({
      LearnLangAddPhraseRoute,
      LearnLangDeckSettingsRoute,
      LearnLangInviteFriendRoute,
      LearnLangPublicLibraryRoute,
      LearnLangReviewRoute,
      LearnLangSearchRoute,
      LearnLangIndexRoute,
    }),
    LearnAddDeckRoute,
    LearnQuickSearchRoute,
    LearnIndexRoute,
  }),
  AboutLazyRoute,
  ComponentsLazyRoute,
  PrivacyPolicyLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_user",
        "/learn",
        "/about",
        "/components",
        "/privacy-policy"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/forgot-password",
        "/_auth/set-new-password",
        "/_auth/signup"
      ]
    },
    "/_user": {
      "filePath": "_user.tsx",
      "children": [
        "/_user/getting-started",
        "/_user/profile"
      ]
    },
    "/learn": {
      "filePath": "learn.tsx",
      "children": [
        "/learn/$lang",
        "/learn/add-deck",
        "/learn/quick-search",
        "/learn/"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/components": {
      "filePath": "components.lazy.tsx"
    },
    "/privacy-policy": {
      "filePath": "privacy-policy.lazy.tsx"
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_user/getting-started": {
      "filePath": "_user/getting-started.tsx",
      "parent": "/_user"
    },
    "/_user/profile": {
      "filePath": "_user/profile.tsx",
      "parent": "/_user",
      "children": [
        "/_user/profile/change-email",
        "/_user/profile/change-password"
      ]
    },
    "/learn/$lang": {
      "filePath": "learn/$lang.tsx",
      "parent": "/learn",
      "children": [
        "/learn/$lang/add-phrase",
        "/learn/$lang/deck-settings",
        "/learn/$lang/invite-friend",
        "/learn/$lang/public-library",
        "/learn/$lang/review",
        "/learn/$lang/search",
        "/learn/$lang/"
      ]
    },
    "/learn/add-deck": {
      "filePath": "learn/add-deck.tsx",
      "parent": "/learn"
    },
    "/learn/quick-search": {
      "filePath": "learn/quick-search.tsx",
      "parent": "/learn"
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/set-new-password": {
      "filePath": "_auth/set-new-password.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.lazy.tsx",
      "parent": "/_auth"
    },
    "/learn/": {
      "filePath": "learn/index.tsx",
      "parent": "/learn"
    },
    "/_user/profile/change-email": {
      "filePath": "_user/profile.change-email.tsx",
      "parent": "/_user/profile"
    },
    "/_user/profile/change-password": {
      "filePath": "_user/profile.change-password.tsx",
      "parent": "/_user/profile"
    },
    "/learn/$lang/add-phrase": {
      "filePath": "learn/$lang/add-phrase.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/deck-settings": {
      "filePath": "learn/$lang/deck-settings.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/invite-friend": {
      "filePath": "learn/$lang/invite-friend.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/public-library": {
      "filePath": "learn/$lang/public-library.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/review": {
      "filePath": "learn/$lang/review.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/search": {
      "filePath": "learn/$lang/search.tsx",
      "parent": "/learn/$lang"
    },
    "/learn/$lang/": {
      "filePath": "learn/$lang/index.tsx",
      "parent": "/learn/$lang"
    }
  }
}
ROUTE_MANIFEST_END */
