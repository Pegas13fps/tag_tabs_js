import Tabs from './tabs-component.js';

let tabs = [
    { title: '1111', content: 'Tex about Lviv. ' },
    { title: 'Ky2222iv', content: 'Tex about Kyiv.' },
    { title: 'Kha33333rkiv', content: 'Tex about Kharkiv.' }
];

let tabsComponent = new Tabs({
    element: document.querySelector('[data-component="tabs"]'),
    tabs: tabs,
})

tabsComponent.subscribe('tab-selected', ({ title, content }) => {
    console.log(`1 Tab ${ title } was selected \n ${content}`);
});

let tabsElements = [...document.querySelectorAll('tabs')];
tabsElements.forEach((el) => {
    el.addEventListener('tab-selected', (event) => {
        let { title } = event.detail;
        console.log(title);
    })
})