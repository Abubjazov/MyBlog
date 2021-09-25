import './index.css'
import { HeaderComponent } from './components/header.component'
import { NavigationComponent } from './components/navigation.component'
import { CreateComponent } from './components/create.component'
import { PostsComponent } from './components/posts.component'
import { FavoriteComponent } from './components/favorite.component'
import { ProgressBar } from './components/proggressbar.component'

new HeaderComponent('header')

const progressbar = new ProgressBar('loader'),
      navigation = new NavigationComponent('navigation'),
      create = new CreateComponent('create'),
      posts = new PostsComponent('posts', {progressbar}),
      favorite = new FavoriteComponent('favorite', {progressbar})

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorite', component: favorite}
])
