import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { ParseService } from '../services/parse.service'
import { renderPost } from '../templates/post.template'

export class PostsComponent extends Component {
    constructor(id, {progressbar}) {
        super(id)
        this.progressbar = progressbar
    }

    init() {
        this.$elem.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.progressbar.show()

        const fbData = await apiService.getPosts(),
              posts = ParseService.fbObjToArray(fbData),
              html = posts.map(post => renderPost(post, {withButton: true})).join(' ')
        
        this.progressbar.hide()
        this.$elem.innerHTML = html
    }
}

function buttonHandler(event) {
    const e = event.target,
          id = e.dataset.id

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        
        if (favorites.includes(id)) {
            e.textContent = 'В избранное'
            e.classList.add('button-primary')
            e.classList.remove('button-danger')
            favorites = favorites.filter(fId => fId !== id)
        } else {
            e.textContent = 'Удалить'
            e.classList.add('button-danger')
            e.classList.remove('button-primary')
            favorites.push(id)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}
