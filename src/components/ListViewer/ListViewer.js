import React from 'react';

import { getUserAgent } from '../../utils/utils';
import './ListViewer.css'


export const ListViewer = (props) => {
    const { columnJson, results } = props;
    const userAgent = getUserAgent();

    const renderHeader = (list) => <div className="columnName" key={list.key}>{list.displayValue}</div>;

    const renderMobileHeader = (rowKey) => <span className="rowCaption" key={rowKey}>{rowKey}</span>;

    const renderRowCells = (rowData, rowkeys) => {
        const isMobile = userAgent === 'mobile';
        return rowkeys.map(rowKey => <div className="cellData" key={rowKey}>{isMobile && renderMobileHeader(rowKey)}{rowData[rowKey]}</div>)
    };
    
    const renderRows = (results) => {
        const rowkeys = columnJson.map(data => data.key);
        const rowDoms = results.map(rowData => (
            <div className="rowData" key={`${rowData.mass}${rowData.name}`}>
                {renderRowCells(rowData, rowkeys)}
            </div>
        ));
        return rowDoms;
    };

    return (
        <div className="listTable">
            <div className="tableHeader">
                {columnJson.map(data => renderHeader(data))}
            </div>
            <div className="tableRows">
                {results && renderRows(results)}
            </div>
        </div>
    )
}