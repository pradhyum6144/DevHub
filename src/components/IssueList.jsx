import { useState } from 'react';
import "./IssueList.css";

function IssueList({ issues }) {

  const[searchIssue, setSearchIssue] = useState("");

  const filterIssue = issues.filter((issue)=>
    issue.title?.toLowerCase().includes(searchIssue.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 2;

  const indexOfLastIssue = currentPage *  issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;

  const currentIssues = filterIssue.slice(indexOfFirstIssue, indexOfLastIssue);

  const totalPages = Math.ceil(filterIssue.length / issuesPerPage);

  const nextPage = () => {
    if(currentPage < totalPages) setCurrentPage(prev => prev + 1);
  }

  const prevPage = () => {
    if(currentPage > 1) setCurrentPage(prev => prev -1);
  }

  
  return (
    <div className="issue-container bg-black">
      <h1 className="myh1">Issues</h1>
      <div className="input-container">
        <input
          className="input-issue"
          placeholder="Search issues..."
          onChange={(e)=> setSearchIssue(e.target.value)}
        />
      </div>

      <div className="issue-card">
        {currentIssues.map((issue) =>

          <div className="issue-row" key={issue.id}>
            <div className="issue-Details">
              <h1 className="issueName">{issue.title}</h1>
              <p className="issueDetails">{issue.description}</p>
            </div>
            <div className="tag">
              <p className="change">{issue.status}</p>
            </div>
          </div>
        )}
      </div>
      <div className="pagination-info">
        <div className='prev-btn'>
          <button onClick={prevPage} className='prev-Issue' disabled={currentPage === 1}>
            Previous
          </button>
        </div>
        <span className='display'>
          Page { currentPage } of { totalPages }
        </span>
        <div className='next-btn'>
          <button className='next-issue' onClick={ nextPage } disabled={ currentPage === totalPages }>Next</button>
        </div>
      </div>
    </div>
  );
}

export default IssueList;

