import { useRef } from "react";

function Search({setSearchQuery}) {

    const searchBox = useRef(null);

    const search = function() {
        setSearchQuery(searchBox.current.value);
    }

    return (
        <div className="row bg-white justify-content-center">
            <div className="col-10">
                <div className="input-group mb-3 p-2">
                    <input ref={searchBox} onKeyUp={search} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"></input>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="bi bi-search me-3"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Search;