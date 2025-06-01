/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards4)'];

    // Get all card items
    const cards = element.querySelectorAll(':scope > div > ul > li');

    // Map over each card and construct rows for the table
    const rows = Array.from(cards).map((card) => {
        const imageContainer = card.querySelector('.cards-card-image img');
        const cardBody = card.querySelector('.cards-card-body');

        const image = imageContainer.cloneNode(true); // Clone the image element
        const textContent = cardBody.cloneNode(true); // Clone card body to preserve structure

        return [image, textContent];
    });

    const cells = [headerRow, ...rows];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with new block table
    element.replaceWith(block);
}