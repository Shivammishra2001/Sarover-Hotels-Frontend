import { makeHotelSectionPage } from "@/lib/hotelSectionPage";

export const revalidate = 3600;
const page = makeHotelSectionPage("contact", "/contact", "Contact");
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
