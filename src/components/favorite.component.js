import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, {progressbar}) {
        super(id)
        this.progressbar = progressbar
    }

    init() {
        this.$elem.addEventListener('click', linkClickHandler.bind(this))
    }

   onShow() {
        const favorites =JSON.parse(localStorage.getItem('favorites')),
              html = renderList(favorites)

        this.$elem.innerHTML = html
    }
}

async function linkClickHandler(event) {
    event.preventDefault()

    if (event.target.classList.contains('js-link')) {
        this.progressbar.show()

        const postId = event.target.textContent,
              post = await apiService.getPostById(postId)          
              
        post.id = postId

        const html = renderPost(post, {withButton: false})

        this.progressbar.hide()
        this.$elem.innerHTML = html
    }
}

function renderList(list = []) {
    if (list.length) {
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
            </ul>
        `
    }

    return(`<p class="center">Вы пока ничего не добавили</p>`)
}
