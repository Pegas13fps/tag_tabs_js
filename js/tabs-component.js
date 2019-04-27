import Component from './component.js';

export default class Tabs extends Component {
    constructor({ element, tabs }) {
        super({ element });
        this._tabs = tabs || [...this._element.children]
        .filter((el) => el.matches('tab'))
        .map((tabEl) => {
            const title = tabEl.getAttribute('title') || 'no-name';
            const content = tabEl.textContent;
            return {title, content};
        })

        this._currentTab = 0;

        this._render();

        this.on('click', '[data-element="tab-select"]', (event) => {
            const tabSelectEl = event.target.closest('[data-element="tab-select"]');
            this._currentTab = tabSelectEl.dataset.tabId;
            this._render();
            this.emit('tab-selected', this.getCurrentTabData());

            const tabSelectedEvent = new CustomEvent('tab-selected', {
                detail: this.getCurrentTabData()
            })
            this._element.dispatchEvent(tabSelectedEvent);
        })
    }

    getCurrentTabData() {
        return this._tabs[this._currentTab];
    }

    _render() {
        this._element.innerHTML = `
            <div class="tabs__controls">
                ${
                    this._tabs.map((tab, i) => `
                        <button data-element="tab-select" data-tab-id="${i}">${tab.title}</button>
                    `).join('')
                }
            </div>
            <div class="tabs__content" data-element="content">
                ${
                    this.getCurrentTabData().content
                }
            </div>
        `
    }
}

const allTabs = [...document.querySelectorAll('tabs')];
allTabs.forEach((el) => {
    new Tabs({ element: el});
})