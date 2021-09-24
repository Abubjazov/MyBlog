import { Component } from '../core/component'

export class HeaderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        if (localStorage.getItem('visited')) {
            document.querySelector('#w-container').classList.remove('hide')
            this.hide()
        }
        this.$elem.querySelector('.js-header-start').addEventListener('click', buttonHandler.bind(this))
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true))
    document.querySelector('#w-container').classList.remove('hide')
    this.hide()
}
