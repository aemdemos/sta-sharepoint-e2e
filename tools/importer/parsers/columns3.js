/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns']; // Corrected header row

    const rows = [];

    // Process immediate children of the block
    const columns = element.querySelectorAll(':scope > div > div');

    columns.forEach((column) => {
        const cellContent = []; // Consolidate content for single-cell rows

        // Add text-based content (paragraphs, lists, etc.)
        const textContent = column.querySelector('p, ul');
        if (textContent) {
            cellContent.push(textContent);
        }

        // Add images
        const pictureElement = column.querySelector('picture');
        if (pictureElement) {
            const imgElement = pictureElement.querySelector('img');
            if (imgElement) {
                cellContent.push(imgElement);
            }
        }

        // Add links and ensure they're part of the same cell
        const linkElement = column.querySelector('a');
        if (linkElement && linkElement.href) {
            const link = document.createElement('a');
            link.href = linkElement.href;
            link.textContent = linkElement.title || 'Link';
            cellContent.push(link);
        }

        rows.push([cellContent]); // Single cell per row
    });

    const tableData = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table); // Replace the original element with the generated table
}