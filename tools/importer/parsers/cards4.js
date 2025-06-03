/* global WebImporter */
export default function parse(element, { document }) {
    const cards = element.querySelectorAll(':scope > div > ul > li');
    const rows = [['Cards (cards4)']];

    cards.forEach((card) => {
        const image = card.querySelector('.cards-card-image img');
        const title = card.querySelector('.cards-card-body p strong');
        const description = card.querySelector('.cards-card-body p:nth-of-type(2)');

        const imageElement = document.createElement('img');
        if (image) {
            imageElement.src = image.src;
            imageElement.alt = image.alt;
        }

        const textContainer = [];
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title.textContent;
            textContainer.push(titleElement);
        }
        if (description) {
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description.textContent;
            textContainer.push(descriptionElement);
        }

        rows.push([imageElement, textContainer]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}