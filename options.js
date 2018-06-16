var filterMethods = ["Censor", "Substitute", "Remove"];
var config = {};
var defaults = {
  "censorCharacter": "*",
  "filterMethod": 0, 
  "password": null,
  "preserveFirst": false,
  "preserveLast": false,
  "showCounter": true,
  "words": {}
};

function filterMethodSelect(event) {
  config.filterMethod = document.getElementById('filterMethodSelect').selectedIndex;
  saveOptions(event, config);
}

tabs = document.getElementsByClassName("tablinks");
for (i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function(e) { openTab(e); });
}

function populateOptions() {
  chrome.storage.sync.get(defaults, function(settings) {
    config = settings; // Make config globally available
    migrateWordList(); // TODO: Migrate wordList
    if (Object.keys(config.words).length === 0 && config.words.constructor === Object) {
      config.words = defaultWords;
      saveOptions(null, config);
      return false;
    }

    // console.log('Password:', config.password, 'Authenticated:', authenticated); // DEBUG Password
    if (config.password && !authenticated) {
      // console.log('Prompt for password'); // DEBUG Password
      hide(document.getElementById('main'));
      show(document.getElementById('passwordContainer'));
    }

    // Show/hide censor options and word substitutions based on filter method
    dynamicList(filterMethods, 'filterMethodSelect');
    document.getElementById('filterMethodSelect').selectedIndex = settings.filterMethod;
    switch (settings.filterMethod) {
      case 0:
        show(document.getElementById('optionsCensor'));
        hide(document.getElementById('optionsSubstitution'));
        show(document.getElementById('globalMatchMethod'));
        hide(document.getElementById('wordSubstitutions'));
        break;
      case 1:
        hide(document.getElementById('optionsCensor'));
        show(document.getElementById('optionsSubstitution'));
        show(document.getElementById('globalMatchMethod'));
        show(document.getElementById('wordSubstitutions'));
        break;
      case 2:
        hide(document.getElementById('optionsCensor'));
        hide(document.getElementById('optionsSubstitution'));
        hide(document.getElementById('globalMatchMethod'));
        hide(document.getElementById('wordSubstitutions'));
        break;
    }

    // Hide per-word matching options if not selected globally (always show for Remove filter method)
    if (settings.globalMatchMethod == 3 || settings.filterMethod == 2) {
      show(document.getElementById('wordMatchMethodContainer'));
    } else {
      hide(document.getElementById('wordMatchMethodContainer'));
    }

    // Settings
    document.getElementById('censorFixedLengthSelect').selectedIndex = settings.censorFixedLength;
    document.getElementById('censorCharacterSelect').value = settings.censorCharacter;
    document.getElementById('preserveFirst').checked = settings.preserveFirst;
    document.getElementById('preserveLast').checked = settings.preserveLast;
    document.getElementById('substitutionMark').checked = settings.substitutionMark;
    document.getElementById('showCounter').checked = settings.showCounter;
    dynamicList(matchMethods.slice(0, -1), 'globalMatchMethodSelect');
    document.getElementById('globalMatchMethodSelect').selectedIndex = settings.globalMatchMethod;
    // Words
    dynamicList(Object.keys(config.words).sort(), 'wordSelect', 'Words to Filter');
    dynamicList([], 'substitutionSelect', 'Substitutions');
    dynamicList([], 'wordMatchMethodSelect', 'Select a Word');
    // Domains
    dynamicList(settings.disabledDomains, 'domainSelect', 'Disabled Domains');
  });
}


document.getElementById('filterMethodSelect').addEventListener('change', filterMethodSelect);