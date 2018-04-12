import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import HomeView from './views/HomeView.vue';
import PostView from './views/PostView.vue';
import SuitsView from './views/SuitsView.vue';
import SuitsArchiveView from './views/SuitsArchiveView.vue';
import PageView from './views/PageView.vue';
//import GalleryView from './views/GalleryView.vue';
//import ParentView from './views/ParentView.vue';
import AboutView from './views/AboutView.vue';
import NotFoundView from './views/NotFoundView.vue';
import Thanks from './views/Thanks.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: HomeView },
    { name: 'post', path: '/blog/:slug', component: PostView },
    { name: 'suits', path: '/our-suits/:slug', component: SuitsView },
    { name: 'our-suits', path: '/our-suits', component: SuitsArchiveView },
    { name: 'thanks', path: '/thanks', component: Thanks },

    { name: 'default',
     path: '/:slug',
//     redirect: {
//     name: "Child1"
//      },
     component: PageView,
//            children: [
//                {
//                    path: ":slug",
//                    name: 'child',
//                    component: PageView
//                }
//            ]


    },
    { name: 'content-child', path: '/content-services/:slug', component: PageView },
    { name: 'exp-child', path: '/experiences/:slug', component: PageView },
//    { name: 'content-services', path: '/content-services', component: ParentView },
//    { name: 'platform', path: '/the-platform', component: PageView },
//    { name: 'content-child', path: '/content-services/:slug', component: GalleryView },
//    { name: 'experiences-child', path: '/experiences/:slug', component: PageView },
    { path: '*', component: NotFoundView },
  ],
  scrollBehavior() {


      return { x: 0, y: 0 };


  },
});
