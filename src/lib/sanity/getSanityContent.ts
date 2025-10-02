import { fetchSanityData } from "../sanity/fetch";

const IS_DEVELOPMENT = process.env.DEVELOPMENT;

// export async function getContactPageContent() {
//   try {
//     const data = await fetchSanityData(
//       getContactPageQuery(),
//       {},
//       { revalidate: IS_DEVELOPMENT ? 10 : 60 }
//     );
//     return data;
//   } catch (error) {
//     console.error('Error fetching contact page content:', error);
//     return null;
//   }
// }
