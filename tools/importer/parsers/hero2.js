/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract anchor links
  const extractLinks = (container) => {
    return Array.from(container.querySelectorAll('a')).map((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.title = link.title;
      a.textContent = link.textContent;
      return a;
    });
  };

  // Extract copyright information
  const copyrightElement = element.querySelector('p');
  const copyrightText = copyrightElement ? copyrightElement.textContent : '';

  // Extract privacy and other links
  const linksContainer = element.querySelectorAll('p')[1];
  const links = linksContainer ? extractLinks(linksContainer) : [];

  // Create table content
  const tableContent = [
    ['Footer'], // Corrected header row to match the example markdown
    [
      document.createTextNode(copyrightText),
      links,
    ],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace original element with new block
  element.replaceWith(block);
}