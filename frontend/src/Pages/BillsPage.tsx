import './BillsPage.scss';

export function BillsPage() {
  return (
    <>
      <div className="billsPage" data-testid="bills-page">
        <h1>Recurring Bills</h1>
        <div className="billsPageDetails">
          <div className="billsPageDetailsOverview">
            <div className="billTotal">
              <img className="billTotalImage" />
              <label className="billTotalTitle"></label>
              <label className="billTotalAmount"></label>
            </div>
            <div className="billSummary">
              <div className="billSummaryTitle">
                <div className="billSummaryRow"></div>
                <hr />
                <div className="billSummaryRow"></div>
                <hr />
                <div className="billSummaryRow"></div>
              </div>
            </div>
          </div>
          <div className="billCard">
            <div className="billCardSearchbar"></div>
            <div className="billCardTable">
              <div className="billCardTableHeader"></div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
              <hr />
              <div className="billCardTableRow">
                <div className="billCardTableRowName">
                  <img className="billCardTableRowNamePicture" />
                  <label className="billCardTableRowNameLabel"></label>
                </div>
                <label className="billCardTableRowDate"></label>
                <label className="billCardTableRowAmount"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
