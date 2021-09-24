import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { ParseService } from '../services/parse.service'

export class PostsComponent extends Component {
    constructor(id) {
        super(id)
    }

    async onShow() {
        const fbData = await apiService.getPosts(),
              posts = ParseService.fbObjToArray(fbData)

        console.log(posts)
    }
}
