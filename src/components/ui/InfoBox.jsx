// components/InfoBox.jsx
export function InfoBox({ icon, title, children }) {
  return (
    <div className="bg-[#D2D5DB]/12 p-4 sm:p-5 rounded-[10px] flex-1">
      <div className="flex flex-row items-center border-b border-[#C1C1C1] pb-2">
        <img src={icon} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        <p className="text-[14px] sm:text-[15px] font-medium ml-2">{title}</p>
      </div>
      {children}
    </div>
  );
}