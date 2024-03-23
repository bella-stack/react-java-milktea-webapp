import { Link } from 'react-router-dom';

const DrinkCard = ({ drink, isHighContrast }) => {
  return (
    <Link to={`/customization/${drink.id}`} className="no-underline text-black">
      <div 
        className={`p-4 border shadow-md rounded m-4 relative cursor-pointer hover:shadow-xl flex flex-col items-center
        ${isHighContrast ? 'text-white border-2 border-teal-300 hover:bg-teal-300 hover:text-black' : ''}
        `}>
        <h2 className="font-semibold">{drink.name}</h2>
        <p>Price: ${drink.price.toFixed(2)}</p>
        <div className="flex justify-center items-center w-full mt-2">
          <img
            src={`drink_default.png`}
            alt={drink.name}
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      </div>
    </Link>
  );
};

export default DrinkCard;