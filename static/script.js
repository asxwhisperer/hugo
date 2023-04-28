// Get all ".post-content" elements and ".title-link" elements
const elements = document.querySelectorAll('.post-content, .title-link');

// Loop through each element and search for the desired strings
elements.forEach((el) => {
  const content = el.innerHTML;
  const regex = /\(([^)]*:[^)]*)\)/g; // Regular expression to match the desired strings
  const matches = content.matchAll(regex); // Get all matches

  // Loop through each match and wrap it in a "span" or "a" tag with the class "ticker"
  let modifiedContent = content;
  for (const match of matches) {
    const tickerEl = document.createElement(el.classList.contains('title-link') ? 'span' : 'a');
    tickerEl.classList.add('ticker');
    const url = `/categories/${match[1].split(':')[1].trim().toLowerCase()}/`; // Get the URL from the matched regex and ensure it's lowercase
    if (!el.classList.contains('title-link')) { // If it's an "a" tag, set the href attribute and onclick attribute
      tickerEl.href = url;
      tickerEl.setAttribute('onclick', "fathom.trackGoal('H79GZHC5', 0)"); // Add onclick attribute using setAttribute
    }
    tickerEl.innerHTML = `(${match[1]})`;
    modifiedContent = modifiedContent.replace(match[0], tickerEl.outerHTML);
  }

  // Set the modified content back into the element
  el.innerHTML = modifiedContent;
});
