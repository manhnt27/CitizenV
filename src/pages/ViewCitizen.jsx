import * as React from 'react';
import TopMenu from './components/TopMenu';
import PaginationTable from './components/PaginationTable';

const ViewCitizen = () => {
  return (
    <div>
      <TopMenu target="Dân cư" role="A1"></TopMenu>
      <PaginationTable></PaginationTable>
    </div>
  );
}

export default ViewCitizen;
