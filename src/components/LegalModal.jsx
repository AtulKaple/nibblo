import React from "react";

export default function LegalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-[#F4EFEA] text-stone-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-stone-300/50">
        <button
          className="absolute top-3 right-3 sm:top-5 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#622B14] hover:text-white border border-stone-300 text-stone-700 flex items-center justify-center text-xl sm:text-2xl font-bold transition-all shadow-sm cursor-pointer z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="text-center mb-5 sm:mb-6 pr-6 sm:pr-0">
          <span className="inline-block bg-[#5C2416] text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
            NIBBLO · Product Specifications
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#3A1700] my-2 font-black font-['Archivo',sans-serif]">
            Nutrition Facts &amp; Ingredients
          </h2>
          <p className="text-stone-600 text-xs sm:text-base">
            The Smarter Snack — 150g Net Weight
          </p>
        </div>

        {/* Nutritional Panel */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-sm mb-5 sm:mb-6">
          <h4 className="text-sm sm:text-lg font-black text-[#3A1700] pb-2 border-b-2 border-[#3A1700] mb-3 sm:mb-4 font-['Archivo',sans-serif]">
            Nutrition Facts (Per 30 g Serving)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
            <div className="bg-[#F8F1EB] p-2.5 sm:p-3 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                ENERGY
              </span>
              <span className="text-lg sm:text-xl font-black text-[#3A1700]">
                146 kcal
              </span>
            </div>
            <div className="bg-[#F8F1EB] p-2.5 sm:p-3 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                PROTEIN
              </span>
              <span className="text-lg sm:text-xl font-black text-[#3A1700]">3.2 g</span>
            </div>
            <div className="bg-[#F8F1EB] p-2.5 sm:p-3 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                CARBS
              </span>
              <span className="text-lg sm:text-xl font-black text-[#3A1700]">19.5 g</span>
            </div>
            <div className="bg-[#F8F1EB] p-2.5 sm:p-3 rounded-xl">
              <span className="block text-[10px] sm:text-[11px] font-bold text-green-700 uppercase tracking-wider">
                FIBRE
              </span>
              <span className="text-lg sm:text-xl font-black text-green-700">2.8 g</span>
            </div>
            <div className="bg-[#F8F1EB] p-2.5 sm:p-3 rounded-xl col-span-2 sm:col-span-1">
              <span className="block text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                TOTAL FAT
              </span>
              <span className="text-lg sm:text-xl font-black text-[#3A1700]">6.4 g</span>
            </div>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="text-sm leading-relaxed text-stone-700 space-y-4">
          <div>
            <h4 className="text-[#3A1700] font-black text-base mb-1 font-['Archivo',sans-serif]">
              Clean Ingredients
            </h4>
            <p className="bg-white p-4 rounded-xl border border-stone-200 text-stone-800">
              <strong>Millets (Jowar, Ragi)</strong>, Dark Chocolate, Cocoa,
              Jaggery, Rice Crisp, Natural Flavours.
            </p>
          </div>

          <div>
            <h4 className="text-[#3A1700] font-black text-base mb-1 font-['Archivo',sans-serif]">
              The NIBBLO Promise
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>
                <strong>Made with Super-Millets:</strong> Naturally
                nutrient-dense Jowar (sorghum) &amp; Ragi (finger millet).
              </li>
              <li>
                <strong>High Fibre:</strong> 2.8g of natural prebiotic dietary
                fibre per serving.
              </li>
              <li>
                <strong>Zero Maida:</strong> 100% free of refined white flour or
                chemical fillers.
              </li>
              <li>
                <strong>Baked, Not Fried:</strong> Slow-baked for the signature
                crunch without heavy frying oils.
              </li>
              <li>
                <strong>Real Dark Chocolate:</strong> Rich, velvety cocoa
                naturally balanced with subtle jaggery.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#3A1700] font-black text-base mb-1 font-['Archivo',sans-serif]">
              Brand &amp; Packaging Details
            </h4>
            <p className="text-xs text-stone-500 leading-normal">
              NIBBLO is a premium healthy snacking brand. Net Wt: 150g
              resealable pouch. Store in a cool, dry place away from direct
              sunlight. Once opened, zip pouch tightly to preserve maximum
              crunch.
            </p>
          </div>
        </div>

        <div className="mt-7 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#3A1700] hover:bg-[#221008] text-white font-extrabold text-sm rounded-full tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            Close Nutrition Panel
          </button>
        </div>
      </div>
    </div>
  );
}
