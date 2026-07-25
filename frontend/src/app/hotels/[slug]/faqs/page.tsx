import { makeHotelSectionPage } from "@/lib/hotelSectionPage";

export const revalidate = 3600;
const page = makeHotelSectionPage("faqs", "/faqs", "FAQs");
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
