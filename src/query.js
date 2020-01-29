export default async function retrieveContent() {
  const url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=8143056d9889c2dc39d43642d996fbd89da39bdb";

  const response = await fetch(url);
  return response.json();
}