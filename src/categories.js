export class Categories {
    constructor(categories, examples) {
        this.categories = categories;
        this.examples = examples;
        this.containerCategories = document.querySelector(".categories");
        this.spanCategories = document.querySelector(".spanCategories");
    }

    init() {
        this.createCategoryButtons();
        this.createExampleButtons();
        this.attachEventListeners();
    }

    createButton(text, className) {
        const button = document.createElement('button');
        button.className = 'rect-btn ' + className;
        button.id = text;
        button.textContent = text;
        return button;
    }

    createBackArrow(className) {
        const backArrow = document.createElement('div');
        backArrow.className = 'back-arrow ' + className;
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-arrow-left';
        backArrow.appendChild(icon);
        return backArrow;
    }

    createCategoryButtons() {
        for (let i = 0; i < this.categories.length; i += 2) {
            const buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';

            const button1 = this.createButton(this.categories[i], this.categories[i].replace(/\s+/g, ''));
            buttonRow.appendChild(button1);

            if (i + 1 < this.categories.length) {
                const button2 = this.createButton(this.categories[i + 1], this.categories[i + 1].replace(/\s+/g, ''));
                buttonRow.appendChild(button2);
            }

            this.containerCategories.appendChild(buttonRow);
        }
    }

    createExampleButtons() {
        this.categories.forEach(category => {
            const containerExamples = document.createElement('div');
            containerExamples.className = 'rect-box ' + category.replace(/\s+/g, '');
            containerExamples.style.display = 'none';

            const exampleButtons = this.examples.get(category);
            if (exampleButtons) {
                for (let i = 0; i < exampleButtons.length; i += 2) {
                    const exampleRow = document.createElement('div');
                    exampleRow.className = 'button-row';

                    const exampleButton1 = this.createButton(exampleButtons[i], '');
                    exampleRow.appendChild(exampleButton1);

                    if (i + 1 < exampleButtons.length) {
                        const exampleButton2 = this.createButton(exampleButtons[i + 1], '');
                        exampleRow.appendChild(exampleButton2);
                    }

                    containerExamples.appendChild(exampleRow);
                }
            }

            const backArrowRow = document.createElement('div');
            backArrowRow.className = 'button-row';
            const backArrow = this.createBackArrow(category.replace(/\s+/g, ''));
            backArrowRow.appendChild(backArrow);
            containerExamples.appendChild(backArrowRow);

            this.spanCategories.appendChild(containerExamples);
        });
    }

    handleButtonClick(buttonClass, divToShowClass) {
        const categoriesDiv = document.querySelector('.rect-box.categories');
        const divToShow = document.querySelector(`.rect-box.${divToShowClass}`);
        const backArrow = divToShow.querySelector('.back-arrow');

        buttonClass.addEventListener('click', () => {
            this.toggleVisibility(categoriesDiv, false);
            this.toggleVisibility(divToShow, true);
        });

        backArrow.addEventListener('click', () => {
            this.toggleVisibility(categoriesDiv, true);
            this.toggleVisibility(divToShow, false);
        });
    }

    toggleVisibility(element, show) {
        element.style.display = show ? 'flex' : 'none';
    }

    attachEventListeners() {
        for (let i = 0; i < this.categories.length; i++) {
            const categoryClass = this.categories[i].replace(/\s+/g, '');
            this.handleButtonClick(document.querySelector(`.rect-btn.${categoryClass}`), categoryClass);
        }
    }
}

