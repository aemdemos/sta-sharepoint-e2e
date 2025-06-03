/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row for the table
    const headerRow = ['Tabs (tabs1)'];

    // Extract tab labels and their corresponding content dynamically
    const tabLabels = element.querySelectorAll(':scope .nav-drop');

    const tabRows = Array.from(tabLabels).map((tabLabel) => {
        const label = tabLabel.firstChild?.textContent.trim() || 'Unknown Tab';
        const content = tabLabel.querySelector(':scope > ul') || document.createElement('div');
        return [label, content];
    });

    // Build the cells array for the table block
    const cells = [headerRow, ...tabRows];

    // Create the table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(blockTable);
}