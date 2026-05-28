import { createRouter, createWebHistory } from 'vue-router'

import HomeView     from '@/views/HomeView.vue'
import FixturesView from '@/views/FixturesView.vue'
import SquadView    from '@/views/SquadView.vue'
import NewsView     from '@/views/NewsView.vue'
import NewsDetail   from '@/views/NewsDetail.vue'
// import TableView    from '@/views/TableView.vue'
// import GalleryView  from '@/views/GalleryView.vue'
// import AboutView    from '@/views/AboutView.vue'
// import ContactView  from '@/views/ContactView.vue'

const routes = [
  { path: '/',          name: 'home',       component: HomeView },
  { path: '/fixtures',  name: 'fixtures',   component: FixturesView },
  { path: '/squad',     name: 'squad',      component: SquadView },
  { path: '/news',      name: 'news',       component: NewsView },
  { path: '/news/:id',  name: 'news-detail',component: NewsDetail },
//   { path: '/table',     name: 'table',      component: TableView },
//   { path: '/gallery',   name: 'gallery',    component: GalleryView },
//   { path: '/about',     name: 'about',      component: AboutView },
//   { path: '/contact',   name: 'contact',    component: ContactView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})