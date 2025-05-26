/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards4)'];
    const rows = [];

    // Select all card elements
    const cards = element.querySelectorAll(':scope > div.cards.block > ul > li');

    cards.forEach((card) => {
        const imageWrapper = card.querySelector(':scope > div.cards-card-image');
        const bodyWrapper = card.querySelector(':scope > div.cards-card-body');

        const image = imageWrapper.querySelector('img');
        const title = bodyWrapper.querySelector('p:first-of-type');
        const description = bodyWrapper.querySelector('p:last-of-type');

        const cellImage = image ? image : '';
        const cellTextContent = [];

        if (title) {
            cellTextContent.push(title);
        }

        if (description) {
            cellTextContent.push(description);
        }

        rows.push([cellImage, cellTextContent]);
    });

    // Create table
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}