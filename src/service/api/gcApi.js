export default {
   CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
   API_KEY: process.env.VUE_APP_GOOGLE_API_KEY,
   DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"], // Array of API discovery doc URLs for APIs used by the quickstart
   SCOPES: "https://www.googleapis.com/auth/calendar", // Authorization scopes required by the API; multiple scopes can be
   syntaxHighlight: (json) => {
      if (typeof json != "string") {
         json = JSON.stringify(json, undefined, 2);
      }
      json = json
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;");
      return json.replace(
         /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
         match => {
            var cls = "number";
            if (/^"/.test(match)) {
               if (/:$/.test(match)) {
                  cls = "key";
               } else {
                  cls = "string";
               }
            } else if (/true|false/.test(match)) {
               cls = "boolean";
            } else if (/null/.test(match)) {
               cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
         }
      );
   }
}