const CustomizationCard = ({ category, type, onClick, isSelected, isHighContrast }) => {
    
    const imageName = `${type.toLowerCase()}_${category.toLowerCase()}.png`;
    
    const caption = category === 'Sweetness' ? `${type}% ${category}` : `${type} ${category}`;

    let theme = 'w-full h-full border rounded-full hover:shadow-lg ';
    if (isHighContrast) {
      theme += 'hover:bg-lime-400'
      if (isSelected){ theme += ' bg-lime-400 border-lime-400 shadow-lg border-4'} 
      else { theme += ' bg-white' }
    } 
    else {
      theme += 'hover:bg-slate-300'
      if (isSelected){  theme += ' bg-slate-300 shadow-lg border-4 border-yellow-500' }
    }
    
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 cursor-pointer items-center'>
        <div className="flex w-full mt-2 mr-2 justify-end">
          <img
            src={`/customization_images/${imageName}`}
            alt={caption}
            className={theme}
            onClick={() => onClick(category, type)}
          />
        </div>
        <h2 className="ml-2 font-semibold">{caption}</h2>
      </div>
  );
};

export default CustomizationCard;