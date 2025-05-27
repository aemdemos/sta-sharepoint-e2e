/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example structure
  const headerRow = ['Hero (hero2)'];

  // Extract the image element dynamically from the input element
  const imageElement = element.querySelector(':scope img');

  // Extract the heading element dynamically from the input element
  const headingElement = element.querySelector(':scope h1');

  // Handle cases where elements are missing or empty
  const imageCell = imageElement ? imageElement : document.createTextNode('');
  const headingCell = headingElement ? headingElement : document.createTextNode('');

  // Prepare the data for the table based on example structure
  const cells = [
    headerRow, // Ensure header row has exactly one column
    [imageCell, headingCell], // Split into separate columns within the second row
  ];

  // Create the table using the WebImporter helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the document with the new block table
  element.replaceWith(block);
}