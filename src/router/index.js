import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
import Home from "@/views/Home"
import Forum from "@/views/Forum"
import Question from "@/views/Question"
import NotFound from "@/views/NotFound"
import Categories from "@/views/Categories"
import SearchCategory from "@/views/SearchCategory"
import Profile from "@/views/Profile"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profil',
    name: 'profile',
    component: Profile
  },
  {
    path: '/forum',
    name: 'forum',
    component: Forum
  },
  {
    path: '/forum/sorular/:id',
    name: 'question',
    component: Question
  },
  {
    path: '/forum/kategoriler',
    name: 'categories',
    component: Categories
  },
  { 
    path: '/forum/kategoriler/:searchcategory',
    name: 'searchcategory',
    component: SearchCategory
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

  router.beforeEach((to,from,next) =>{
    const authRequiredRoutes = ["profile"];
    const _isAuthenticated = store.getters._isAuthenticated;


  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "home" });
  } else {
    next();
  }
  });

export default router
