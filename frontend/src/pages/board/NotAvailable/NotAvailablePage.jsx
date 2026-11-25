import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import Panel from '../../../components/Panel/Panel';

export default function NotAvailablePage() {
  return (
    <Panel>
      <EmptyState
        title="This page isn’t available yet"
        action={
          <Button variant="secondary" href="#/bureau">
            Back to the overview
          </Button>
        }
      >
        It is not part of the designs we have so far (pages 29 to 38).
      </EmptyState>
    </Panel>
  );
}
