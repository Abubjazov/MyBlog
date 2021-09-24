import { Component } from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)
        this.tabs = []
    }

    init() {
       this.$elem.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }
}

function tabClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('tab')) {
        this.$elem.querySelectorAll('.tab').forEach(e => e.classList.remove('active'))
        this.tabs.forEach(t => t.component.hide())

        event.target.classList.add('active')
        this.tabs.find(t => t.name === event.target.dataset.name).component.show()
        


    }
}
