import React from 'react';

import { fetchApi } from '../rest-services/fetch';
import { TabButton } from '../components/TabButton/TabButton';
import { ListViewer } from '../components/ListViewer/ListViewer';
import { columnJson, peopleDataUrl, tabList } from './config';
import './CompanyDetails.css';

class CompanyDetails extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        peopleData: [],
        pageLimit: 10,
        currentPageIndex: 1,
      };
  };

  componentDidMount() {
    this.fetchPeopleData(peopleDataUrl);
  }
 
  fetchPeopleData = async (url) => {
    const peopleData = await fetchApi(url);
    this.setState({ peopleData });
  }

  fetchFromPagination = (pageNo) => {
    const { currentPageIndex } =  this.state;
    if (currentPageIndex !== pageNo) {
        const pageUrl = peopleDataUrl.split('?').join(`?page=${pageNo}&`);
        this.fetchPeopleData(pageUrl);
        this.setState({ currentPageIndex: pageNo });
    }
  };

  navPageData = (navTo) => {
    const { peopleData, currentPageIndex } = this.state;
    const url = peopleData[navTo];
    url && this.fetchPeopleData(url);
    
    this.setState({ currentPageIndex: (navTo === 'previous' ? currentPageIndex - 1 : currentPageIndex + 1) });

  }

  renderPagination = (peopleData, pageLimit, currentPageIndex) => {
    const { count } = peopleData;
    const numOfPages = parseInt((count + pageLimit - 1) / pageLimit);
    const prevPage =
      <div className={`pagination prevPage ${currentPageIndex === 1 ? 'disable' : '' }`} onClick={() => this.navPageData('previous')}>Prev</div>;
    const nextPage =
      <div className={`pagination nextPage ${currentPageIndex === numOfPages ? 'disable' : '' }`} onClick={() => this.navPageData('next')}>Next</div>;
    let pageNoDom = [];
    for(let i = 1; i <= numOfPages; i++) {
        const selectedPage = currentPageIndex === i ? ' selected' : ';'
        pageNoDom.push(
          <div className={`pagination page-${i}${selectedPage}`} key={`page${i}`} onClick={() => this.fetchFromPagination(i)}>{i}</div>
        );
    }
    return (
      count ? <>{prevPage}{pageNoDom}{nextPage}</> : <></>
    )
  };

  render() {
    const { peopleData, pageLimit, currentPageIndex } = this.state;
    const { results } = peopleData;
    return(
    <div className="listView">
        <TabButton tabList={tabList} />
        <div className="overviewHeader">
            <span className="totalCount">{peopleData?.count || 0} People Found</span>
        </div>
        <ListViewer results={results} columnJson={columnJson} />
        <div className="paginationWrapper">
            <div className="paginationList">
                {peopleData && this.renderPagination(peopleData, pageLimit, currentPageIndex)}
            </div>
        </div>
    </div>
    );
  };
}

export default CompanyDetails;