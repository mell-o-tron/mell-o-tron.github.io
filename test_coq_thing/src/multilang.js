async function readJsonFile(url) {
    try {
        // Fetch the JSON file
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const jsonData = await response.json();

        // Return the parsed data
        return jsonData;

    } catch (err) {
        console.error("Error fetching or parsing the file:", err);
        return null; // Return null in case of an error
    }
}



// POOR MAN'S SINGLETON
class LanguageSelector {

  constructor(){
    if (LanguageSelector._instance){
        console.log("ESISTE ISTANZA");
        console.log(LanguageSelector._instance) // PRINTS OBJECT WITH ATTRIBUTE current_language
        console.log(LanguageSelector._instance.current_language) // PRINTS UNDEFINED???
        this.current_language = LanguageSelector._instance.current_language
    }
    LanguageSelector._instance = this;
  }

  async select_language(lang){
    try {
      const language_obj = await readJsonFile(`./languages/${lang}.json`);
      this.current_language = language_obj;
      console.log("Language set successfully:", this.current_language);
    } catch (err) {
      console.error("No such language found:", err);
    }
  }

}

export { LanguageSelector };
