import './index.css'
import { HeaderComponent } from './components/header.component'
import { NavigationComponent } from './components/navigation.component'
import { CreateComponent } from './components/create.component'
import { PostsComponent } from './components/posts.component'
import { FavoriteComponent } from './components/favorite.component'

new HeaderComponent('header')

const navigation = new NavigationComponent('navigation')
// new CreateComponent('create')
// new PostsComponent('posts')
// new FavoriteComponent('favorite')

navigation.registerTabs([
    {name: 'create', component: new CreateComponent('create')},
    {name: 'posts', component: new PostsComponent('posts')},
    {name: 'favorite', component: new FavoriteComponent('favorite')}
])
