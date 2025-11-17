export default function useCapitalize() {
    try {
      const capitalize = (text: string) => {
        if (text) {
          return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }
        return '';
      };
  
      const capitalizeEachWord = (text: string) => {
        if (text) {
          return text
            .split(' ') // Divide el texto en palabras
            .map((word) => capitalize(word)) // Aplica capitalización a cada palabra
            .join(' '); // Une las palabras capitalizadas
        }
        return '';
      };
  
      return { capitalize, capitalizeEachWord };
      
    } catch (error) {
      console.log("useCapitalize", error);
    }
};