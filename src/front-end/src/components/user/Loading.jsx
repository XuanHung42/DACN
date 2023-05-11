import Button  from "react-bootstrap/Button";
import  Spinner  from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="text-center">
      <Button>
        <Spinner
        as='span'
        animation="grow"
        size="sm"
        role='status'
        aria-hidden='true'/>
        &nbsp; Đang tải ...
      </Button>
    </div>
  );
}

export default Loading;