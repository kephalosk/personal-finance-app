import OverlayCardBox from '../components/overlay/OverlayCardBox';
import ShowcaseWrapper from './ShowcaseWrapper';
import OverlayContentAddNewPot from '../components/overlay/OverlayContentAddNewPot';

const ShowcaseAddNewPotForm = () => {
  const addNewPotDescription: string =
    'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.';
  const isHidden: boolean = false;
  const handleAddNewPot = () => {};
  const closeForm = () => {};

  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title="Add New Pot"
        description={addNewPotDescription}
        submitText="Add Pot"
        isHidden={isHidden}
        handleEvent={handleAddNewPot}
        onClose={closeForm}
      >
        <OverlayContentAddNewPot />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseAddNewPotForm;
