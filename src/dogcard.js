const DogCard = ({ dog }) => (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
    </div>
  );
  
  export default DogCard;
  