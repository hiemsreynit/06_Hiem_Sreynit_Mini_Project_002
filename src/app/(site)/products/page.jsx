"use client";
import React, { useState, useMemo } from "react";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";

export default function Page({ initialProducts = [] }) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 1. Extract category names correctly from the API object structure
  const categories = useMemo(() => {
    const products = initialProducts || [];
    // Accessing p.category.name based on your Swagger screenshot
    return [...new Set(products.map((p) => p.category?.name))].filter(Boolean);
  }, [initialProducts]);

  // 2. Fix the filtering logic
  const filteredProducts = useMemo(() => {
    const products = initialProducts || [];
    return products.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesPrice = Number(product.price) <= maxPrice;

      // Compare the string name of the category
      const productCatName = product.category?.name;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCatName);

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [initialProducts, search, maxPrice, selectedCategories]);

  const handleCategoryChange = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName],
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-sans bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Luxury beauty products
          </h1>
          <p className="text-slate-500 mt-1">
            Use the filters to narrow by price and brand.
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by product name..."
            className="rounded-xl border border-slate-200 bg-white p-3 pl-4 w-full md:w-80 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-slate-900 text-lg">Filters</h2>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setMaxPrice(300);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Reset filters
              </button>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                Price Range
              </h3>
              <p className="text-sm font-medium text-slate-700 mb-5">
                $0 — ${maxPrice}{" "}
                <span className="text-slate-300 font-normal ml-1">
                  (no limit)
                </span>
              </p>
              <input
                type="range"
                min="0"
                max="300"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-3">
                <span>$0</span>
                <span>$300</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                Quick Select
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[50, 100, 150].map((price) => (
                  <button
                    key={price}
                    onClick={() => setMaxPrice(price)}
                    className="text-xs border border-slate-200 py-2.5 rounded-xl hover:border-slate-900 transition-all"
                  >
                    Under ${price}
                  </button>
                ))}
                <button
                  onClick={() => setMaxPrice(300)}
                  className="text-xs border border-slate-200 py-2.5 rounded-xl hover:border-slate-900"
                >
                  All prices
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((catName) => (
                  <label
                    key={catName}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(catName)}
                        onChange={() => handleCategoryChange(catName)}
                        className="w-5 h-5 rounded-md border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                        {catName}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                      {
                        initialProducts.filter(
                          (p) => p.category?.name === catName,
                        ).length
                      }
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-6 text-center italic">
                Select none to include all categories.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
            Showing{" "}
            <span className="text-slate-900">{filteredProducts.length}</span>{" "}
            products
          </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ShopCardComponent key={product.productId} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">
                No products match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setMaxPrice(300);
                }}
                className="mt-4 text-sm text-slate-900 underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
