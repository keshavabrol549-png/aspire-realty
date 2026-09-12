import Link from "next/link";

interface Listing {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  images: string[];
  propertyType: string;
}

export default function ListingCard({ listing, vertical }: { listing: Listing, vertical: "india" | "global" }) {
  const cardClass = vertical === "india"
    ? "bg-white border-india-primary shadow-sticker hover:-translate-y-1"
    : "bg-global-bg border-global-primary shadow-sticker-global hover:-translate-y-1 text-global-primary";

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className={`block p-4 border-2 transition-all hover:shadow-lg cursor-pointer ${cardClass}`}>
        <div className="w-full h-48 bg-gray-300 mb-4 flex items-center justify-center overflow-hidden">
          {listing.images && listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">No image</span>
          )}
        </div>
        <h3 className="font-heading text-xl mb-2 line-clamp-2">{listing.title}</h3>
        <p className="text-sm mb-4 opacity-75">{listing.city}, {listing.state}</p>
        <div className="font-bold text-lg">
          {vertical === "global" ? "$" : "₹"}{listing.price.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
