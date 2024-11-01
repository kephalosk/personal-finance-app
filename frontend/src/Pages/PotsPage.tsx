import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { CardHeader } from '../components/CardHeader';

export function PotsPage() {
  return (
    <>
      <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" />
      <div className="potPageGrid">
        <div className="potCard">
          <CardHeader title="Savings" color="dark-green" />
          <div className="potCardDetails">
            <div className="potCardDetailsTotal">
              <div className="potCardDetailsTotalLabel"></div>
              <div className="potCardDetailsTotalAmount"></div>
            </div>
            <div className="potCardBarMax">
              <div className="potCardBarCurrent"></div>
            </div>
            <div className="potCardDetailsPercent">
              <div className="potCardDetailsPercentLabel"></div>
              <div className="potCardDetailsPercentAmount"></div>
            </div>
          </div>
          <div className="potCardButtons">
            <button className="potCardButtonAdd">+ Add Money</button>
            <button className="potCardButtonWithdraw">Withdraw</button>
          </div>
        </div>
        <div className="potCard">
          <CardHeader title="Savings" color="dark-green" />
          <div className="potCardDetails">
            <div className="potCardDetailsTotal">
              <div className="potCardDetailsTotalLabel"></div>
              <div className="potCardDetailsTotalAmount"></div>
            </div>
            <div className="potCardBarMax">
              <div className="potCardBarCurrent"></div>
            </div>
            <div className="potCardDetailsPercent">
              <div className="potCardDetailsPercentLabel"></div>
              <div className="potCardDetailsPercentAmount"></div>
            </div>
          </div>
          <div className="potCardButtons">
            <button className="potCardButtonAdd">+ Add Money</button>
            <button className="potCardButtonWithdraw">Withdraw</button>
          </div>
        </div>
        <div className="potCard">
          <CardHeader title="Savings" color="dark-green" />
          <div className="potCardDetails">
            <div className="potCardDetailsTotal">
              <div className="potCardDetailsTotalLabel"></div>
              <div className="potCardDetailsTotalAmount"></div>
            </div>
            <div className="potCardBarMax">
              <div className="potCardBarCurrent"></div>
            </div>
            <div className="potCardDetailsPercent">
              <div className="potCardDetailsPercentLabel"></div>
              <div className="potCardDetailsPercentAmount"></div>
            </div>
          </div>
          <div className="potCardButtons">
            <button className="potCardButtonAdd">+ Add Money</button>
            <button className="potCardButtonWithdraw">Withdraw</button>
          </div>
        </div>
        <div className="potCard">
          <CardHeader title="Savings" color="dark-green" />
          <div className="potCardDetails">
            <div className="potCardDetailsTotal">
              <div className="potCardDetailsTotalLabel"></div>
              <div className="potCardDetailsTotalAmount"></div>
            </div>
            <div className="potCardBarMax">
              <div className="potCardBarCurrent"></div>
            </div>
            <div className="potCardDetailsPercent">
              <div className="potCardDetailsPercentLabel"></div>
              <div className="potCardDetailsPercentAmount"></div>
            </div>
          </div>
          <div className="potCardButtons">
            <button className="potCardButtonAdd">+ Add Money</button>
            <button className="potCardButtonWithdraw">Withdraw</button>
          </div>
        </div>
        <div className="potCard">
          <CardHeader title="Savings" color="dark-green" />
          <div className="potCardDetails">
            <div className="potCardDetailsTotal">
              <div className="potCardDetailsTotalLabel"></div>
              <div className="potCardDetailsTotalAmount"></div>
            </div>
            <div className="potCardBarMax">
              <div className="potCardBarCurrent"></div>
            </div>
            <div className="potCardDetailsPercent">
              <div className="potCardDetailsPercentLabel"></div>
              <div className="potCardDetailsPercentAmount"></div>
            </div>
          </div>
          <div className="potCardButtons">
            <button className="potCardButtonAdd">+ Add Money</button>
            <button className="potCardButtonWithdraw">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}
