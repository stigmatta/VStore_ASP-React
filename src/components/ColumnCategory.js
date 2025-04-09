import { ArrowRight } from 'lucide-react';
import DiscountPrice from './DiscountPrice';

export default function ColumnCategory({ title, items }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-highlightedText font-black">{title}</h2>
        <ArrowRight size={12} color="#EEEEEE" />

      </div>
      <div className="flex flex-col gap-4 mt-4 ml-2">
        {items.map((item, index) => (
          <div className="flex flex-row items-center gap-8" key={index}>
            <img className="w-[94px]" src={item.image} alt="image" />
            <div className="flex flex-col gap-3">
              <span className="text-bigButton font-black">{item.title}</span>
              <DiscountPrice price={item.price} discount={item.discount} direction="row" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}