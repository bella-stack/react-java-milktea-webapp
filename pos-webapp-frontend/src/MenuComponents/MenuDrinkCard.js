const MenuDrinkCard = ({ drink }) => {
  return (
    <div className="mb-10">
        <div className="flex justify-center">
            <img
                src={`drink_default.png`}
                alt={drink.name}
                className="w-40 h-40 object-cover rounded"
            />
        </div>
        <h2 className="CENTERTEXT font-semibold ">{drink.name}</h2>
        <p className="flex justify-center">Price: ${drink.price.toFixed(2)}</p>
      </div>
  );
};

export default MenuDrinkCard;