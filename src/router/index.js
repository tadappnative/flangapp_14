import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthLayout from "@/layout/AuthLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Password from "@/views/auth/Password";
import Reset from "@/views/auth/Reset";
import Apps from "@/views/account/apps/Apps";
import Main from "@/views/account/apps/builder/Main";
import Design from "@/views/account/apps/builder/Design";
import Navigation from "@/views/account/apps/builder/Navigation";
import Localization from "@/views/account/apps/builder/Localization";
import Assets from "@/views/account/apps/builder/Assets";
import Push from "@/views/account/apps/builder/Push";
import Build from "@/views/account/apps/builder/Build";
import Profile from "@/views/account/profile/Profile";
import Transactions from "@/views/account/profile/Transactions";
import Newsletter from "@/views/account/newsletter/Newsletter";
import Keys from "@/views/account/keys/Keys";
import KeysAndroid from "@/views/account/keys/KeysAndroid";
import Tickets from "@/views/account/support/Tickets";
import Archive from "@/views/account/support/Archive";
import Ticket from "@/views/account/support/Ticket";
import Dashboard from "@/views/control/dashboard/Dashboard";
import Settings from "@/views/control/settings/Settings";
import Plans from "@/views/control/plans/Plans";
import AdminTransactions from "@/views/control/transactions/AdminTransactions";
import AdminTickets from "@/views/control/tickets/AdminTickets";
import AdminApps from "@/views/control/apps/AdminApps";
import Customers from "@/views/control/customers/Customers";
import Comments from "@/views/control/tickets/Comments";
import PendingTickets from "@/views/control/tickets/PendingTickets";
import ArchiveTickets from "@/views/control/tickets/ArchiveTickets";
import AdminAssets from "@/views/control/apps/detailt/AdminAssets";
import AdminBuild from "@/views/control/apps/detailt/AdminBuild";
import AdminDesign from "@/views/control/apps/detailt/AdminDesign";
import AdminLocalization from "@/views/control/apps/detailt/AdminLocalization";
import AdminMain from "@/views/control/apps/detailt/AdminMain";
import AdminNavigation from "@/views/control/apps/detailt/AdminNavigation";
import AdminPush from "@/views/control/apps/detailt/AdminPush";
import CustomerApps from "@/views/control/customers/CustomerApps";
import CustomerKey from "@/views/control/customers/CustomerKey";
import CustomerProfile from "@/views/control/customers/CustomerProfile";
import CustomerTickets from "@/views/control/customers/CustomerTickets";
import CustomerTransactions from "@/views/control/customers/CustomerTransactions";
import CustomerKeyAndroid from "@/views/control/customers/CustomerKeyAndroid";
import Methods from "@/views/control/deposit/Methods";
import store from "@/store";
import axios from "axios";
import {config} from "@/config/config";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AuthLayout,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.login) {
        next();
      } else {
        next('/account/apps');
      }
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
      {
        path: '/auth/sign_up',
        name: 'Register',
        component: Register,
      },
      {
        path: '/auth/forgot',
        name: 'Password',
        component: Password,
      },
      {
        path: '/auth/reset',
        name: 'Reset',
        component: Reset,
      },
    ]
  },
  {
    path: '/account/',
    name: 'Account',
    component: PrivateLayout,
    beforeEnter: (to, from, next) => {
      if (store.state.user.login) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '/account/apps',
        name: 'Apps',
        component: Apps,
      },
      {
        path: '/account/apps/:uid/main',
        name: 'Main',
        component: Main,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/design',
        name: 'Design',
        component: Design,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/navigation',
        name: 'Navigation',
        component: Navigation,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/localization',
        name: 'Localization',
        component: Localization,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/assets',
        name: 'Assets',
        component: Assets,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/push',
        name: 'Push',
        component: Push,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/apps/:uid/build',
        name: 'Build',
        component: Build,
        meta: {
          sidebar: 'builder'
        }
      },
      {
        path: '/account/profile',
        name: 'Profile',
        component: Profile,
        meta: {
          sidebar: 'profile'
        }
      },
      {
        path: '/account/profile/transactions',
        name: 'Transactions',
        component: Transactions,
        meta: {
          sidebar: 'profile'
        }
      },
      {
        path: '/account/newsletter',
        name: 'Newsletter',
        component: Newsletter,
        meta: {
          sidebar: 'newsletter'
        }
      },
      {
        path: '/account/keys',
        name: 'Keys',
        component: Keys,
        meta: {
          sidebar: 'keys'
        }
      },
      {
        path: '/account/keys/android',
        name: 'KeysAndroid',
        component: KeysAndroid,
        meta: {
          sidebar: 'keys'
        }
      },
      {
        path: '/account/support',
        name: 'Support',
        component: Tickets,
        meta: {
          sidebar: 'support'
        }
      },
      {
        path: '/account/support/archive',
        name: 'Archive',
        component: Archive,
        meta: {
          sidebar: 'support'
        }
      },
      {
        path: '/account/support/ticket/:ticket_uid',
        name: 'Ticket',
        component: Ticket,
        meta: {
          sidebar: 'support'
        }
      }
    ]
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: PrivateLayout,
    beforeEnter: (to, from, next) => {
      if (store.state.user.admin) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/settings',
        name: 'Settings',
        component: Settings,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/plans',
        name: 'Plans',
        component: Plans,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/transactions',
        name: 'AdminTransactions',
        component: AdminTransactions,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/deposit',
        name: 'Methods',
        component: Methods,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/tickets',
        name: 'AdminTickets',
        component: AdminTickets,
        meta: {
          sidebar: 'admin',
          actionbar: 'support'
        }
      },
      {
        path: '/admin/tickets/pending',
        name: 'PendingTickets',
        component: PendingTickets,
        meta: {
          sidebar: 'admin',
          actionbar: 'support'
        }
      },
      {
        path: '/admin/tickets/archive',
        name: 'ArchiveTickets',
        component: ArchiveTickets,
        meta: {
          sidebar: 'admin',
          actionbar: 'support'
        }
      },
      {
        path: '/admin/tickets/detail/:ticket_uid',
        name: 'Comments',
        component: Comments,
        meta: {
          sidebar: 'admin',
          actionbar: 'support'
        }
      },
      {
        path: '/admin/apps',
        name: 'AdminApps',
        component: AdminApps,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/customers',
        name: 'Customers',
        component: Customers,
        meta: {
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/customers/:id/profile',
        name: 'CustomerProfile',
        component: CustomerProfile,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/customers/:id/apps',
        name: 'CustomerApps',
        component: CustomerApps,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/customers/:id/transactions',
        name: 'CustomerTransactions',
        component: CustomerTransactions,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/customers/:id/keys',
        name: 'CustomerKey',
        component: CustomerKey,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/customers/:id/keys/android',
        name: 'CustomerKeyAndroid',
        component: CustomerKeyAndroid,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/customers/:id/tickets',
        name: 'CustomerTickets',
        component: CustomerTickets,
        meta: {
          sidebar: 'admin',
          actionbar: 'customer'
        }
      },
      {
        path: '/admin/apps/:uid/main',
        name: 'AdminMain',
        component: AdminMain,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/design',
        name: 'AdminDesign',
        component: AdminDesign,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/navigation',
        name: 'AdminNavigation',
        component: AdminNavigation,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/localization',
        name: 'AdminLocalization',
        component: AdminLocalization,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/assets',
        name: 'AdminAssets',
        component: AdminAssets,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/push',
        name: 'AdminPush',
        component: AdminPush,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
      {
        path: '/admin/apps/:uid/build',
        name: 'AdminBuild',
        component: AdminBuild,
        meta: {
          actionbar: 'builder',
          sidebar: 'admin'
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.state.isStarted) {
    axios.get(`${config.serverUrl}api/configuration/initial`).then(response => {
      store.commit('setLanguage', response.data.result.language);
      store.commit('setConfig', response.data.result.configs);
      store.commit('setLanguageHeader', response.data.result.locale);
      store.commit('setInitialStatus', true);
      next();
    }).catch(error => {
      console.log(error);
    })
  } else {
    next();
  }
})

export default router;
