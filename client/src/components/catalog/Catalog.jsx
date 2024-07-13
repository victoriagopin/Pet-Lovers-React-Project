import CatalogItem from "./catalog-item/CatalogItem";

export default function Catalog({
    pets,
    
}){
     return (
        <>
        <h2 className="catalog-heading">All Of Your Furry Friends</h2>
        <section className="catalog">
            {pets.map(pet => 
            <CatalogItem 
                key={pet._id}
                pet={pet}
                // onDetailsClick={onDetailsClick}
              
            />
            )}
        </section>
        </>
     )
}