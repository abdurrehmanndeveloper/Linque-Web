export function RestaurantCard({ image, title, subtitle, discount }) {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="w-full h-40 sm:h-48 bg-cover bg-center relative rounded-lg overflow-hidden"
    >
      {discount && (
        <div className="absolute top-2 left-0 bg-[#6A14DC] flex items-center gap-1 px-2 py-0.5 rounded">
          <img src="/icons/discount.png" className="w-3 h-3" alt="discount" />
          <span className="text-[9px] font-medium text-white">{discount}</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 px-3 py-2">
        <span className="text-[18px] font-semibold text-white block">{title}</span>
        <span className="text-[12px] text-gray-300">{subtitle}</span>
      </div>
    </div>
  );
}