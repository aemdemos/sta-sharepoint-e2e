/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns3)'];

    const columns = Array.from(element.querySelectorAll(':scope > div > div'));

    const rows = columns.map((col) => {
        const textContent = []; // Collect text-related content separately

        // Extract text elements
        const textElements = col.querySelectorAll(':scope > div:not(.columns-img-col), :scope > p');
        textElements.forEach((node) => textContent.push(node));

        // Extract image elements
        const imageElement = col.querySelector(':scope > .columns-img-col img');

        // Extract links with 'src' attributes for non-image elements
        const links = col.querySelectorAll(':scope > p.button-container a');
        links.forEach((link) => {
            textContent.push(link);
        });

        // Return a row with properly separated content (text and images)
        return imageElement ? [textContent, imageElement] : [textContent];
    });

    const data = [headerRow, ...rows];

    const blockTable = WebImporter.DOMUtils.createTable(data, document);

    element.replaceWith(blockTable);
}