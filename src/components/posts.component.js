import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { ParseService } from '../services/parse.service'

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
              html = posts.map(post => renderPost(post)).join(' ')
        
        this.progressbar.hide()
        this.$elem.innerHTML = html
    }
}

function renderPost(post) {
    const tag = post.type === 'news' 
        ? '<li class="tag tag-blue tag-rounded">Новость</li>' 
        : '<li class="tag tag-rounded">Заметка</li>'

    const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
        ? `<button class="button-round button-small button-danger" data-id="${post.id}">Удалить</button>`
        : `<button class="button-round button-small button-primary" data-id="${post.id}">В избранное</button>`

    return `
        <div class="panel">
        <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            <ul class="tags">
            ${tag}
            </ul>
        </div>
        <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
            <small>${post.date} ${post.time}</small>
            ${button}
        </div>
        </div>
    `
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
