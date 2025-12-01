import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import Card from "./Card.jsx";
import { data } from "./data.js";

function Search() {
  const [searchOrg, setSearchOrg] = useState("");

  const filterData = data.filter((org) =>
  org.organizationName.toLowerCase().includes(searchOrg.toLowerCase())
  );

  const [currentPage , setCurrentPage] = useState(1);
  const orgsPerPage = 10;

  const  indexOfLastOrg = currentPage * orgsPerPage;
  const indexOfFirstOrg = indexOfLastOrg - orgsPerPage;


  const currentOrgs = filterData.slice(indexOfFirstOrg, indexOfLastOrg);

  const totalPages = Math.ceil(filterData.length / orgsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  }

  const PrevPage = () => {
    if(currentPage > 1) setCurrentPage(prev => prev - 1);
  }


  return (
    <div className="search-Bar bg-black w-full min-h-screen">
      <h2 className="org-text">Organizations</h2>

      <div className="input-wrapper">
        <FaSearch id="search-icon" color="#c9d1d9" size={21} />
        <input
          className="input"
          placeholder="Search Organizations..."
          onChange={(e) =>{
            setSearchOrg(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div>
        {currentOrgs.map((org) => (
          <Card
            key={org.organizationName}
            id={org.id}
            organizationName={org.organizationName}
            description={org.description}
            openIssues={org.openIssues}
            closedIssues={org.closedIssues}
            contributors={org.contributors}
          />
        ))}
      </div>

      <div className="pagination">
        <div className="pagination-prev">
          <button className="btn-prev" onClick={PrevPage} disabled={currentPage === 1}>
            Previous
          </button>
        </div>
        <span className="pages">
          Page {currentPage} of {totalPages}
        </span>
        <div className="pagination-next">
          <button className="btn-next" onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button> 
        </div>
      </div>


    </div>
  );
}

export default Search;
