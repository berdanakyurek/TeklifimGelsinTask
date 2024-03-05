export type LanguageType = null | "de" | "en";

class Fact {
  id: string = "";
  text?: string = "";
  source?: string = "";
  source_url?: string = "";
  language: LanguageType = null;
  permalink?: string = "";
}
export default Fact;
