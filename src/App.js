const App = () => {
  
  const categories = [
    {
      id: 1,
      title: 'hats',
    },
    {
      id: 2,
      title: 'jackets',
    },
    {
      id: 3,
      title: 'sneakers',
    },
    {
      id: 4,
      title: 'womens',
    },
    {
      id: 5,
      title: 'mens',
    }
  ];
  return (
    <div className='categories-container'>
      { categories.map( ( { id, title } ) => (
        <div key={id} className='category-container'>
          <div className='background-image'></div>
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ) ) }
    </div>
  );
}

export default App;
