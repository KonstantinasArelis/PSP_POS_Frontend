import "../App.css";

const SingleBusiness = ({Business}) => {
    return(
        <div className="singleBusiness">
            <p> Business id: {Business.id}</p>
            <p> business name: {Business.business_name}</p>
            <p> business address: {Business.business_address}</p>
            <p> Business phone: {Business.phone}</p>
            <p> Business email: {Business.email}</p>
            <p> Business currency: {Business.currency}</p>
        </div>
    )
}

export default SingleBusiness;