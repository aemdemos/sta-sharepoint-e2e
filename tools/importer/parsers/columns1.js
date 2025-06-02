/* global WebImporter */
 export default function parse(element, { document }) {
    const headerRow = ['Columns (columns1)'];

    // Extract immediate child divs
    const children = [...element.querySelectorAll(':scope > div')];

    // First column content
    const firstColumnContent = document.createElement('div');
    firstColumnContent.innerHTML = `
      <p>Columns block</p>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
      <a href="https://word-edit.officeapps.live.com/" target="_blank">Live</a>
    `;

    // Second column content
    const secondColumnContent = document.createElement('div');
    const firstImage = document.createElement('img');
    firstImage.src = "https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500";
    secondColumnContent.append(firstImage);

    // Construct table cells
    const cells = [
      headerRow,
      [firstColumnContent, secondColumnContent],
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with block table
    element.replaceWith(blockTable);
}