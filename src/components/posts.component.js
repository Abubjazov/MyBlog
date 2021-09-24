import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { ParseService } from '../services/parse.service'

export class PostsComponent extends Component {
    constructor(id, {progressbar}) {
        super(id)
        this.progressbar = progressbar
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

    const button = '<button class="button-round button-small button-primary">В избранное</button>'
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
