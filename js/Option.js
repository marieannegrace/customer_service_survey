export class Option {

    title;
    value;
    constructor(title, value) {
        this.title = title;
        this.value = value;
    }

    async getTemplate() {
        return `<li class="awswer" value="${opt.value}"> 
            ${opt.title}
        </li>`;
    }


}