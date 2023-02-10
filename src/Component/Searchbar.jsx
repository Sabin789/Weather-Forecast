import {Form} from"react-bootstrap"

const SearchBar = () => {
    return ( 
        <>
        <Form>

  <Form.Group controlId="formBasicPassword">

    <Form.Control type="text" placeholder="Search Location..." />
  </Form.Group>
        </Form>
        </>
     );
}
 
export default SearchBar;